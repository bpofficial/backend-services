import { AccountServiceProvider, MemberServiceProvider } from '@app/clients';
import { AccountService } from '@app/proto/account';
import { Connection } from '@app/proto/connection';
import { MemberService } from '@app/proto/member';
import { Logger } from '@nestjs/common';
import OpenIDConnectStrategy, {
    VerifyCallback,
    VerifyFunction,
} from 'passport-openidconnect';

export class OidcStrategy {
    private readonly logger = new Logger('OidcStrategy');
    private readonly accountService: AccountService;
    private readonly memberService: MemberService;

    constructor(
        private readonly accountServiceProvider: AccountServiceProvider,
        private readonly memberServiceProvider: MemberServiceProvider,
    ) {
        this.accountService = this.accountServiceProvider.getService();
        this.memberService = this.memberServiceProvider.getService();
    }

    getStrategy(connection: Connection) {
        return new OpenIDConnectStrategy(
            {
                clientID: connection.config.oidc.clientId,
                clientSecret: connection.config.oidc.clientSecret,
                issuer: connection.config.oidc.issuer,
                authorizationURL: connection.config.oidc.authorizationURL,
                tokenURL: connection.config.oidc.tokenURL,
                callbackURL: connection.config.oidc.callbackURL,
                userInfoURL: connection.config.oidc.userInfoURL,
            },
            this.getVerifier(connection),
        );
    }

    getVerifier(connection: Connection): VerifyFunction {
        return async (
            _issuer: string,
            _uiProfile: object,
            _idProfile: object,
            context: any,
            _idToken: string | object,
            accessToken: string | object,
            _refreshToken: string,
            _params: any,
            done: VerifyCallback,
        ) => {
            // The OIDC Token is a JWT, so we can decode it to get the user's OIDC ID.
            // The ID is either the user's account ID for this connection or an email.
            const aidOrEmail = accessToken['sub'];

            // If the user's OIDC ID is an email, we need to get the account ID for this email.
            // If the user's OIDC ID is an account ID, we can use it directly.
            // In either case, we need to get the member ID for this account ID.

            let uid: string;
            if (aidOrEmail.includes('@')) {
                const { account, error } =
                    await this.accountService.GetAccountByUsername({
                        username: aidOrEmail,
                        cid: connection.id,
                    });

                if (error) {
                    return done(null, null, {
                        message: error.message,
                    });
                }

                uid = account.uid;
            }

            const { member, error } =
                await this.memberService.GetMemberByUserID({
                    uid,
                    oid: connection.oid,
                });

            if (error) {
                return done(null, null, {
                    message: error.message,
                });
            }

            try {
                const userSessionInfo = {
                    id: uid,
                    email: '',
                    name: '',
                    mid: member.id,
                    oid: connection.oid,
                    cid: connection.id,
                };

                // Store user information in session
                context.req.session.user = userSessionInfo;

                // Pass the user information to the done callback
                return done(null, userSessionInfo);
            } catch (error) {
                this.logger.error(`Error in OIDC strategy: ${error.message}`);
                return done(null, null, { message: error.message });
            }
        };
    }
}
