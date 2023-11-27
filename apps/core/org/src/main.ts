import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { OrgModule } from './org.module';

const logger = new Logger();

async function bootstrap() {
    await createService('Organisation', 'service.org', OrgModule);
    logger.log(`Organisation service created`, 'Microservice');
}

bootstrap();
