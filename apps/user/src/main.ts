import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { UserModule } from './user.module';

const logger = new Logger();

async function bootstrap() {
    await createService('User', 'service.user', UserModule);
    logger.log(`User service created`, 'Microservice');
}

bootstrap();
