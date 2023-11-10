// org.schema.ts
import { Org } from '@app/proto/org';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class Organisation extends Document implements Omit<Org, 'id'> {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    owner: string;

    @Prop({ required: true })
    domain: string;

    @Prop({ required: true })
    callbackUrl: string;
}

const OrganisationSchema = SchemaFactory.createForClass(Organisation);

// Define a virtual property `id` that gets the `_id` value as a string
OrganisationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
OrganisationSchema.set('toJSON', {
    virtuals: true,
});

export { OrganisationSchema };
