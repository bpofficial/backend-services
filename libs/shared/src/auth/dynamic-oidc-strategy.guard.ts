import {
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { PassportStatic } from 'passport';
import { DynamicOidcStrategyFactory } from './dynamic-oidc-strategy.factory';
import { AuthGuard } from '@nestjs/passport';
import { OtoPromise } from '@app/utils';
import { isObservable } from 'rxjs';

@Injectable()
export class DynamicOidcAuthGuard extends AuthGuard('oidc') {
    constructor(
        private readonly dynamicOidcStrategyFactory: DynamicOidcStrategyFactory,
    ) {
        super();
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const cid = request.query.cid;

        if (!cid) {
            throw new UnauthorizedException('Invalid connection');
        }

        const strategy =
            await this.dynamicOidcStrategyFactory.createStrategy(cid);

        request._passport = { instance: { _strategy: strategy } };
        (this as any).logIn(request, strategy);

        const result = super.canActivate(context);

        // Handle Observable return type separately
        if (isObservable(result)) {
            return OtoPromise(result);
        } else {
            // Wrap other types in a Promise
            return result;
        }
    }
}
