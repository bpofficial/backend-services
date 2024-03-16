import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { existsSync } from 'fs';
import { join } from 'path';

export function getGrpcConfig(
    service: `service.${string}`,
    configService: ConfigService,
) {
    const host = configService.get(`${service}.host`) || '0.0.0.0';
    const grpcPort = configService.get(`${service}.grpcPort`) || '50051';

    const protoPath = join(
        __dirname,
        configService.get(`${service}.proto`) || '.proto',
    );

    if (!existsSync(protoPath)) {
        return null;
    }

    return {
        transport: Transport.GRPC as Transport.GRPC,
        options: {
            url: `${host}:${grpcPort}`,
            package: 'proto',
            protoPath,
        },
    };
}
