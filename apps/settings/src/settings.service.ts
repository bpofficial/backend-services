import { MongoModel } from '@app/db';
import {
    AuthConfig,
    GetAuthConfigRequest,
    GetAuthConfigResponse,
    Settings,
} from '@app/proto/settings';
import { Injectable, Logger } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class SettingsService {
    private readonly logger = new Logger('SettingsService');

    constructor(@MongoModel('settings') private model: Model<Settings>) {}

    async getAuthConfig(
        req: GetAuthConfigRequest,
    ): Promise<GetAuthConfigResponse> {
        const result = await this.model.findOne({ oid: req.oid });

        if (result) {
            return { config: AuthConfig.fromJSON(result) };
        }

        return { error: { message: 'Config not found' } };
    }
}
