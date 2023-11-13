import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { AccountModule } from './account.module';

const logger = new Logger();

async function bootstrap() {
    await createService('Account', 'service.account', AccountModule);
    logger.log(`Account service created`, 'Microservice');
}

bootstrap();
