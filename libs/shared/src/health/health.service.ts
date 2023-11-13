import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HealthIndicatorResult, HttpHealthIndicator } from '@nestjs/terminus';

@Injectable()
export class HealthService {
    constructor(
        private http: HttpHealthIndicator,
        private configService: ConfigService,
    ) {}

    getHealthUrl(service: `service.${string}`) {
        const config = this.configService.get(service);

        const protocol = 'http://';
        const host = config.host;
        const port = ':' + config.httpPort;
        const pathname = '/health/ping';

        const url = new URL(protocol + host + port + pathname);
        return url.toString();
    }

    pingCheck(
        service: `service.${string}`,
    ): () => Promise<HealthIndicatorResult> {
        return async () => {
            const healthUrl = this.getHealthUrl(service);

            try {
                const response = await this.http.pingCheck(service, healthUrl);

                return response;
            } catch (error) {
                return {
                    [service]: {
                        status: 'down',
                        message: error.message,
                    },
                };
            }
        };
    }
}
