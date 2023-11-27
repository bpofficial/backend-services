// org.schema.ts
import { Org } from '@app/proto/org';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class OrganisationConfig extends Document implements Omit<Org, 'id'> {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    owner: string;

    @Prop({ required: true })
    domain: string;

    @Prop({ required: true })
    callbackUrl: string;
}

const OrganisationConfigSchema =
    SchemaFactory.createForClass(OrganisationConfig);

// Define a virtual property `id` that gets the `_id` value as a string
OrganisationConfigSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
OrganisationConfigSchema.set('toJSON', {
    virtuals: true,
});

export { OrganisationConfigSchema };
