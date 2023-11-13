import { ConfigModule } from '@nestjs/config';
import { devConfiguration } from './configuration.dev';
import { prodConfiguration } from './configuration.prod';

const inContainer = !!process.env.SERVICE_NAME.length;
export const AppConfigModule = ConfigModule.forRoot({
    load: [inContainer ? prodConfiguration : devConfiguration],
});
