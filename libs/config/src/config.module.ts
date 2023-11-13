import { ConfigModule } from '@nestjs/config';
import { devConfiguration } from './configuration.dev';
import { dockerConfiguration } from './configuration.docker';
import { prodConfiguration } from './configuration.prod';

const inPod = !!process.env.SERVICE_NAME?.length;
const inDocker = process.env.DOCKER_ENV === 'true';

export const AppConfigModule = ConfigModule.forRoot({
    load: [
        inPod
            ? prodConfiguration
            : inDocker
            ? dockerConfiguration
            : devConfiguration,
    ],
});
