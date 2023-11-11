import { applyDecorators, createParamDecorator } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

export const MongoModel = createParamDecorator((schema: any) => {
    return applyDecorators(InjectModel(schema.name));
});
