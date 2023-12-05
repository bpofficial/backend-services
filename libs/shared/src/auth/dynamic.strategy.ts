import { ConnectionServiceProvider } from '@app/clients';
import { ConnectionService } from '@app/proto/connection';
import { Injectable } from '@nestjs/common';
import { StrategyService } from './strategies';

@Injectable()
export class DynamicStrategyService {
    private readonly connectionService: ConnectionService;

    constructor(
        private readonly connectionServiceProvider: ConnectionServiceProvider,
        private readonly strategySerivce: StrategyService,
    ) {
        this.connectionService = this.connectionServiceProvider.getService();
    }

    async createStrategy(cid: string) {
        const { connection, error } =
            await this.connectionService.GetConnection({
                cid,
            });

        if (error) {
            return false;
        }

        return this.strategySerivce.getStrategy(connection);
    }
}
