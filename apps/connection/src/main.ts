import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { ConnectionModule } from './connection.module';

const logger = new Logger();

async function bootstrap() {
    await createService('Connection', 'service.connection', ConnectionModule);
    logger.log(`Connection service created`, 'Microservice');
}

bootstrap();
