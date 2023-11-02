import { createService } from '@app/utils';
import { Logger } from '@nestjs/common';
import { RoleModule } from './role.module';

const logger = new Logger();

async function bootstrap() {
    const [{ listen }, { url }] = await createService(
        `service.role`,
        RoleModule,
    );
    await listen();

    logger.log(`Role microservice listening at ${url} on gRPC`, 'Microservice');
}

bootstrap();
