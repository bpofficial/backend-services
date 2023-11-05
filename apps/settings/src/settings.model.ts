import { AuthConfig, Settings } from '@app/proto/settings';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class SettingsModel extends Document implements Omit<Settings, 'id'> {
    @Prop({ required: true })
    oid: string;

    @Prop({ required: false, default: {} })
    authConfig: AuthConfig;
}

const SettingsSchema = SchemaFactory.createForClass(SettingsModel);

// Define a virtual property `id` that gets the `_id` value as a string
SettingsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
SettingsSchema.set('toJSON', {
    virtuals: true,
});

export { SettingsSchema };
