import { Controller, Get, HttpCode } from '@nestjs/common';
import {
    HealthCheckService,
    MemoryHealthIndicator,
    MongooseHealthIndicator,
} from '@nestjs/terminus';
import { HealthService } from './health.service';

@Controller('/health')
export class HealthController {
    constructor(
        private healthService: HealthService,
        private health: HealthCheckService,
        private memory: MemoryHealthIndicator,
        private mongo: MongooseHealthIndicator,
    ) {}

    @Get()
    @HttpCode(200)
    async checkHealth() {
        return this.health.check([
            this.healthService.pingCheck('service.account'),
            this.healthService.pingCheck('service.auth'),
            this.healthService.pingCheck('service.connection'),
            this.healthService.pingCheck('service.member'),
            this.healthService.pingCheck('service.org'),
            this.healthService.pingCheck('service.user'),
            () => this.memory.checkHeap('memory', 150 * 1024 * 1024),
            () => this.mongo.pingCheck('mongodb', { timeout: 1500 }),
        ]);
    }

    @Get('/ping')
    @HttpCode(200)
    async pingHealth() {
        return {
            status: 'up',
        };
    }
}
