import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { OrgModule } from './org.module';

const logger = new Logger();

async function bootstrap() {
    const [ms, app, { url, httpPort }] = await createService(
        `service.org`,
        OrgModule,
    );

    await Promise.all([ms.listen(), app.listen(httpPort)]);

    logger.log(
        `Organisation GRPC microservice listening at ${url}`,
        'Microservice',
    );
    logger.log(
        `Organisation HTTP microservice listening at ${httpPort}`,
        'Microservice',
    );
}

bootstrap();
