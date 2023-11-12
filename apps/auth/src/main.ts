import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { AuthModule } from './auth.module';

const logger = new Logger();

async function bootstrap() {
    await createService('Auth', 'service.auth', AuthModule);
    logger.log(`Auth service created`, 'Microservice');
}

bootstrap();
