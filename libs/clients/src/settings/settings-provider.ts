import { SettingsService } from '@app/proto/settings';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

@Injectable()
export class SettingsServiceProvider implements OnModuleInit {
    private settingsService: SettingsService;

    constructor(@Inject('settings') private client: ClientGrpc) {}

    onModuleInit() {
        this.settingsService =
            this.client.getService<SettingsService>('SettingsService');
    }

    getService(): SettingsService {
        return this.settingsService;
    }
}
