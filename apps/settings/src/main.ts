import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { SettingsModule } from './settings.module';

const logger = new Logger();

async function bootstrap() {
    const [{ listen }, { url }] = await createService(
        `service.settings`,
        SettingsModule,
    );
    await listen();

    logger.log(
        `Settings microservice listening at ${url} on gRPC`,
        'Microservice',
    );
}

bootstrap();
