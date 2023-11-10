import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { AuthModule } from './auth.module';

const logger = new Logger();

async function bootstrap() {
    const [ms, app, { url, httpPort }] = await createService(
        `service.authorize`,
        AuthModule,
    );

    await Promise.all([ms.listen(), app.listen(httpPort)]);

    logger.log(`Auth GRPC microservice listening at ${url}`, 'Microservice');
    logger.log(
        `Auth HTTP microservice listening at ${httpPort}`,
        'Microservice',
    );
}

bootstrap();
