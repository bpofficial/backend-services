import { Role } from '@app/proto/role';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class RoleModel extends Document implements Omit<Role, 'id'> {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, default: [] })
    permissions: string[];

    @Prop({ required: true })
    oid: string;
}

const RoleSchema = SchemaFactory.createForClass(RoleModel);

// Define a virtual property `id` that gets the `_id` value as a string
RoleSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
RoleSchema.set('toJSON', {
    virtuals: true,
});

export { RoleSchema };
