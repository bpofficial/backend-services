import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { OrgModule } from './org.module';

const logger = new Logger();

async function bootstrap() {
    const [{ listen }, { url }] = await createService(`service.org`, OrgModule);
    await listen();

    logger.log(
        `Organisation microservice listening at ${url} on gRPC`,
        'Microservice',
    );
}

bootstrap();
