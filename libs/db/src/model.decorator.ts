import { Inject, applyDecorators, createParamDecorator } from '@nestjs/common';

export const MongoModel = createParamDecorator((schema: any) => {
    return applyDecorators(Inject(`Model/${schema.name}`));
});
