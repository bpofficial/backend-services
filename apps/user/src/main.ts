import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { UserModule } from './user.module';

const logger = new Logger();

async function bootstrap() {
    const [{ listen }, { url }] = await createService(
        `service.user`,
        UserModule,
    );
    await listen();

    logger.log(`User microservice listening at ${url} on gRPC`, 'Microservice');
}

bootstrap();
