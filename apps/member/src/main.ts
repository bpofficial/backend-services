import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { MemberModule } from './member.module';

const logger = new Logger();

async function bootstrap() {
    const [{ listen }, { url }] = await createService(
        `service.member`,
        MemberModule,
    );
    await listen();

    logger.log(
        `Member microservice listening at ${url} on gRPC`,
        'Microservice',
    );
}

bootstrap();
