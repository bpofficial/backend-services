import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { HttpApiModule } from './module';

const logger = new Logger();

async function bootstrap() {
    await createService('REST API', 'service.api', HttpApiModule);
    logger.log(`REST API service created`, 'Microservice');
}

bootstrap();
