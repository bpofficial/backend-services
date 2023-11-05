import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { AuthorizeModule } from './authorize.module';

const logger = new Logger();

async function bootstrap() {
    const [{ listen }, { url }] = await createService(
        `service.authorize`,
        AuthorizeModule,
    );
    await listen();

    logger.log(
        `Authorize microservice listening at ${url} on gRPC`,
        'Microservice',
    );
}

bootstrap();
