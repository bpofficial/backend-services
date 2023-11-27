import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { OrgConfigModule } from './org-config.module';

const logger = new Logger();

async function bootstrap() {
    await createService('Organisation Config', 'service.org', OrgConfigModule);
    logger.log(`Organisation Config service created`, 'Microservice');
}

bootstrap();
