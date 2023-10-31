import { OtoPromise } from '@app/utils';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpaService {
    private readonly logger = new Logger('OpaService');

    constructor(
        private httpService: HttpService,
        private config: ConfigService,
    ) {}

    async evaluatePolicy(policy: string, input: any): Promise<boolean> {
        this.logger.debug(
            `evaluatePolicy: policy=${policy}, input=${JSON.stringify(input)}`,
        );

        const opaUrl = this.config.getOrThrow('opa.url');
        const response = await OtoPromise(
            this.httpService.post(`${opaUrl}/v1/data/${policy}`, {
                input,
            }),
        );

        this.logger.debug(`evaluatePolicy: result=${response.data.result}`);

        return response.data.result;
    }
}
