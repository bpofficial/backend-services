import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class TokenModel extends Document {
    @Prop({ required: true })
    cid: string;

    @Prop({ required: true })
    aid: string;

    @Prop({ required: true })
    jwt: string;

    @Prop({ required: true })
    sub: string;

    @Prop({ required: true })
    exp: number;

    @Prop({ required: true })
    iat: number;

    @Prop({ required: true })
    aud: string;

    @Prop({ required: true })
    iss: string;

    @Prop({ required: true, index: true })
    jti: string;

    @Prop({ required: true, default: false })
    revoked: boolean;
}

const TokenSchema = SchemaFactory.createForClass(TokenModel);

// Define a virtual property `id` that gets the `_id` value as a string
TokenSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
TokenSchema.set('toJSON', {
    virtuals: true,
});

export { TokenSchema };
