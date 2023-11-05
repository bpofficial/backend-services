import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { ConnectionModule } from './connection.module';

const logger = new Logger();

async function bootstrap() {
    const [{ listen }, { url }] = await createService(
        `service.connection`,
        ConnectionModule,
    );
    await listen();

    logger.log(
        `Connection microservice listening at ${url} on gRPC`,
        'Microservice',
    );
}

bootstrap();
