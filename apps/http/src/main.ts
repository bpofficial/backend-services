import { createHttpService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { HttpApiModule } from './module';

const logger = new Logger();

async function bootstrap() {
    await createHttpService('REST API', 'service.http', HttpApiModule);
    logger.log(`REST API service created`, 'Microservice');
}

bootstrap();
