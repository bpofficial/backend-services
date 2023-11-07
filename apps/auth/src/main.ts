import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { AuthModule } from './auth.module';

const logger = new Logger();

async function bootstrap() {
    const [{ listen }, { url }] = await createService(
        `service.authorize`,
        AuthModule,
    );
    await listen();

    logger.log(`Auth microservice listening at ${url} on gRPC`, 'Microservice');
}

bootstrap();
