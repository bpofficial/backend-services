import { Module } from '@nestjs/common';
import { StrategyService } from './strategies.service';

@Module({
    providers: [StrategyService],
    exports: [StrategyService],
})
export class StrategyModule {}
