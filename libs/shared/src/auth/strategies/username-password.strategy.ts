import { AccountServiceProvider, MemberServiceProvider } from '@app/clients';
import { AccountService } from '@app/proto/account';
import { Connection } from '@app/proto/connection';
import { MemberService } from '@app/proto/member';
import { Logger } from '@nestjs/common';
import {
    IVerifyOptions,
    Strategy,
    VerifyFunctionWithRequest,
} from 'passport-local';

export class UsernamePasswordStrategy {
    private readonly logger = new Logger('UsernamePasswordStrategy');
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
        return new Strategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
                session: true,
            },
            this.getVerifier(connection),
        );
    }

    getVerifier(connection: Connection): VerifyFunctionWithRequest {
        return async (
            req: Express.Request,
            username: string,
            password: string,
            done: (
                error: any,
                user?: Express.User | false,
                options?: IVerifyOptions,
            ) => void,
        ) => {
            try {
                const [
                    { success, error: validateError },
                    { account, error: accError },
                ] = await Promise.all([
                    this.accountService.ValidatePassword({
                        username,
                        password,
                        cid: connection.id,
                    }),
                    this.accountService.GetAccountByUsername({
                        username,
                        cid: connection.id,
                    }),
                ]);

                if (!success || validateError || accError) {
                    return done(null, false, {
                        message: 'Invalid username or password',
                    });
                }

                const { member, error: memberError } =
                    await this.memberService.GetMemberByUserID({
                        oid: connection.oid,
                        uid: account.uid,
                    });

                if (memberError) {
                    return done(null, false, {
                        message: 'Invalid username or password',
                    });
                }

                // Create a user object to be saved in session
                const userSessionInfo = {
                    id: account.uid,
                    email: '',
                    name: '',
                    mid: member.id,
                    oid: connection.oid,
                    cid: connection.id,
                };

                // Complete the authentication process by calling done with the user object
                return done(null, userSessionInfo);
            } catch (error) {
                this.logger.error(`Error in authentication: ${error.message}`);
                done(error);
            }
        };
    }
}
