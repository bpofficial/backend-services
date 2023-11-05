import { User } from '@app/proto/user';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class UserModel extends Document implements Omit<User, 'id'> {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;
}

const UserSchema = SchemaFactory.createForClass(UserModel);

// Define a virtual property `id` that gets the `_id` value as a string
UserSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
UserSchema.set('toJSON', {
    virtuals: true,
});

export { UserSchema };
