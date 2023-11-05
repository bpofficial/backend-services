import { MongoDbModule } from '@app/db';
import { OrgIdMiddleware, SharedModule } from '@app/shared';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SettingsHttpController } from './http.controller';
import { SettingsController } from './settings.controller';
import { SettingsSchema } from './settings.model';
import { SettingsService } from './settings.service';

@Module({
    imports: [
        SharedModule,
        MongoDbModule.forRoot('service.settings', 'settings', SettingsSchema),
    ],
    controllers: [SettingsController, SettingsHttpController],
    providers: [SettingsService],
})
export class SettingsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(OrgIdMiddleware).forRoutes(SettingsHttpController);
    }
}
