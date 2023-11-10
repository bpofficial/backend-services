import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { AccountModule } from './account.module';

const logger = new Logger();

async function bootstrap() {
    const [ms, app, { url, httpPort }] = await createService(
        `service.account`,
        AccountModule,
    );

    await Promise.all([ms.listen(), app.listen(httpPort)]);

    logger.log(`Account GRPC microservice listening at ${url}`, 'Microservice');
    logger.log(
        `Account HTTP microservice listening at ${httpPort}`,
        'Microservice',
    );
}

bootstrap();
