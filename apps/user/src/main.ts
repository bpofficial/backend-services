import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { UserModule } from './user.module';

const logger = new Logger();

async function bootstrap() {
    const [ms, app, { url, httpPort }] = await createService(
        `service.user`,
        UserModule,
    );

    await Promise.all([ms.listen(), app.listen(httpPort)]);

    logger.log(`User GRPC microservice listening at ${url}`, 'Microservice');
    logger.log(
        `User HTTP microservice listening at ${httpPort}`,
        'Microservice',
    );
}

bootstrap();
