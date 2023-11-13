import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Consul } from 'consul';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const consul = require('consul');

// Create a Consul client to connect to your Consul server
export const consulClient: Consul = new consul();

const logger = new Logger('ServiceRegister');

export async function registerService(
    service: `service.${string}`,
    configService: ConfigService,
) {
    if (configService.get('prod')) {
        const normalisedServiceName = service
            .split('.')[1]
            .replace(/\./gi, '-');

        await consulClient.agent.service.register(
            `${normalisedServiceName}-service`,
        );

        logger.log(
            `Service '${normalisedServiceName}' registered with consul.`,
        );
    }
}
