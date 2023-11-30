import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { NotifyModule } from './notify.module';

const logger = new Logger();

async function bootstrap() {
    await createService('Notify', 'service.notify', NotifyModule);
    logger.log(`Notification service created`, 'Microservice');
}

bootstrap();
