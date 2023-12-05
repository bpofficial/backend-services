import { Injectable, DynamicModule, Module } from '@nestjs/common';
import passport from 'passport';
import { Strategy } from 'passport-openidconnect';
import { DynamicOidcStrategyFactory } from './dynamic-oidc-strategy.factory';

@Injectable()
export class OidcStrategyProvider {
    constructor(
        private dynamicOidcStrategyFactory: DynamicOidcStrategyFactory,
    ) {}

    async registerStrategy(cid: string): Promise<void> {
        const strategyName = `oidc-${cid}`;
        const strategy =
            await this.dynamicOidcStrategyFactory.createStrategy(cid);

        passport.use(strategyName, strategy as Strategy);
    }
}

@Module({})
export class OidcStrategyProviderModule {
    static forRoot(): DynamicModule {
        return {
            module: OidcStrategyProviderModule,
            providers: [OidcStrategyProvider],
            exports: [OidcStrategyProvider],
        };
    }
}
