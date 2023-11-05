import {
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
} from '@nestjs/common';
import { DynamicStrategyService } from './dynamic.strategy';

@Injectable()
export class OrgDefinedAuthGuard implements CanActivate {
    private readonly logger = new Logger('DynamicGuard');

    constructor(
        private readonly dynamicStrategyService: DynamicStrategyService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const oid = request.user.oid;

            const strategy =
                await this.dynamicStrategyService.createStrategy(oid);

            await strategy.authenticate(request);

            return true;
        } catch (err) {
            this.logger.warn(`canActivate, error: ${err?.message}`);
        }
        return false;
    }
}
