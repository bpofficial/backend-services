import { Connection, ConnectionType } from '@app/proto/connection';
import { OidcStrategy } from './strategies/oidc.strategy';
import { UsernamePasswordStrategy } from './strategies/username-password.strategy';
import { AccountServiceProvider, MemberServiceProvider } from '@app/clients';

export class StrategyService {
    constructor(
        // Providers for the strategies
        private readonly accountServiceProvider: AccountServiceProvider,
        private readonly memberServiceProvider: MemberServiceProvider,
    ) {}

    getOidcStrategy() {
        return new OidcStrategy(
            this.accountServiceProvider,
            this.memberServiceProvider,
        );
    }

    getUsernamePasswordStrategy() {
        return new UsernamePasswordStrategy(
            this.accountServiceProvider,
            this.memberServiceProvider,
        );
    }

    getStrategy(connection: Connection) {
        switch (connection.type) {
            case ConnectionType.OIDC:
                return this.getOidcStrategy().getStrategy(connection);
            case ConnectionType.LOCAL:
                return this.getUsernamePasswordStrategy().getStrategy(
                    connection,
                );
            default:
                return null;
        }
    }
}
