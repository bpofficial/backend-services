import { ConfigModule } from '@nestjs/config';
import { configuration } from './configuration';

export const AppConfigModule = ConfigModule.forRoot({
    load: [configuration],
});
