import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, StringExpressionOperatorReturningArray } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class OidcExchangeModel extends Document {
    @Prop({ required: true })
    cid: string;

    /**
     * This code is provided to the client app
     */
    @Prop({ required: false })
    intermediateCode: string;

    /**
     * This code is provided by the 3rd party identity provider
     */
    @Prop({ required: false })
    exchangeCode: string;

    @Prop({ required: false })
    codeChallenge: string;

    @Prop({ required: false })
    codeVerifier: string;

    @Prop({ required: false })
    state: string;

    @Prop({ required: false })
    scope: string;

    @Prop({ required: false })
    nonce: string;

    @Prop({ required: false })
    redirectUri: string;

    @Prop({ required: false })
    responseType: string;

    @Prop({ required: false })
    responseMode: string;

    @Prop({ required: false })
    prompt: string;
}

const OidcExchangeSchema = SchemaFactory.createForClass(OidcExchangeModel);

// Define a virtual property `id` that gets the `_id` value as a string
OidcExchangeSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
OidcExchangeSchema.set('toJSON', {
    virtuals: true,
});

export { OidcExchangeSchema };
