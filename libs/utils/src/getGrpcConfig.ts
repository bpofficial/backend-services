import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

export function getGrpcConfig(
    service: `service.${string}`,
    configService: ConfigService,
) {
    const host = configService.get(`${service}.host`) || '0.0.0.0';
    const grpcPort = configService.get(`${service}.grpcPort`) || '9090';

    const protoPath = join(
        __dirname,
        configService.get(`${service}.proto`) || '.proto',
    );

    return {
        transport: Transport.GRPC as Transport.GRPC,
        options: {
            url: `${host}:${grpcPort}`,
            package: 'proto',
            protoPath,
        },
    };
}
