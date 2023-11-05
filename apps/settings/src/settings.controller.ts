import {
    GetAuthConfigRequest,
    GetAuthConfigResponse,
    UpdateAuthConfigRequest,
    UpdateAuthConfigResponse,
} from '@app/proto/settings';
import { Controller, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { SettingsService } from './settings.service';

@Controller()
export class SettingsController {
    private readonly logger = new Logger('SettingsController');

    constructor(private readonly settingsService: SettingsService) {}

    @GrpcMethod('SettingsService', 'GetAuthConfig')
    async getAuthConfig(
        data: GetAuthConfigRequest,
    ): Promise<GetAuthConfigResponse> {
        this.logger.debug(`getAuthConfig: oid=${data.oid}`);
        return this.settingsService.getAuthConfig(data);
    }

    @GrpcMethod('SettingsService', 'UpdateAuthConfig')
    async updateAuthConfig(
        data: UpdateAuthConfigRequest,
    ): Promise<UpdateAuthConfigResponse> {
        return {};
    }
}
