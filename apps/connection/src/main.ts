import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { ConnectionModule } from './connection.module';

const logger = new Logger();

async function bootstrap() {
    const [ms, app, { url, httpPort }] = await createService(
        `service.connection`,
        ConnectionModule,
    );

    await Promise.all([ms.listen(), app.listen(httpPort)]);

    logger.log(
        `Connection GRPC microservice listening at ${url}`,
        'Microservice',
    );
    logger.log(
        `Connection HTTP microservice listening at ${httpPort}`,
        'Microservice',
    );
}

bootstrap();
