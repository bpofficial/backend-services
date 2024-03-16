import { ConfigModule } from '@nestjs/config';
import { devConfiguration } from './configuration.dev';
import { prodConfiguration } from './configuration.prod';

const inPod = !!process.env.SERVICE_NAME?.length;

export const AppConfigModule = ConfigModule.forRoot({
    load: [
        inPod
            ? prodConfiguration
            : devConfiguration,
    ],
});
