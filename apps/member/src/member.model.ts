import { Member } from '@app/proto/member';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class MemberModel
    extends Document
    implements Omit<Member, 'id' | 'email' | 'accepted' | 'invitation'>
{
    @Prop({ required: true })
    oid: string;

    @Prop({ required: true })
    uid: string;

    @Prop({ required: true, default: 'user' })
    role: string;
}

const MemberSchema = SchemaFactory.createForClass(MemberModel);

// Define a virtual property `id` that gets the `_id` value as a string
MemberSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MemberSchema.set('toJSON', {
    virtuals: true,
});

export { MemberSchema };
