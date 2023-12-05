import { Module } from '@nestjs/common';
import { StrategyService } from './strategy.service';
import { SharedModule } from '../shared.module';

@Module({
    imports: [SharedModule],
    providers: [StrategyService],
    exports: [StrategyService],
})
export class StrategyModule {}
