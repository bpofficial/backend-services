import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { MemberModule } from './member.module';

const logger = new Logger();

async function bootstrap() {
    const [ms, app, { url, httpPort }] = await createService(
        `service.member`,
        MemberModule,
    );

    await Promise.all([ms.listen(), app.listen(httpPort)]);

    logger.log(`Member GRPC microservice listening at ${url}`, 'Microservice');
    logger.log(
        `Member HTTP microservice listening at ${httpPort}`,
        'Microservice',
    );
}

bootstrap();
