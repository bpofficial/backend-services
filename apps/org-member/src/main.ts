import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { MemberModule } from './member.module';

const logger = new Logger();

async function bootstrap() {
    await createService('Member', 'service.member', MemberModule);
    logger.log(`Member service created`, 'Microservice');
}

bootstrap();
