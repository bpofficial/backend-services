import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { AccountModule } from './account.module';

const logger = new Logger();

async function bootstrap() {
    const [{ listen }, { url }] = await createService(
        `service.account`,
        AccountModule,
    );
    await listen();

    logger.log(
        `Account microservice listening at ${url} on gRPC`,
        'Microservice',
    );
}

bootstrap();
