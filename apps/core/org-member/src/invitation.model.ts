import { Member } from '@app/proto/member';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class MemberInvitation extends Document implements Omit<Member, 'id'> {
    @Prop({ required: true })
    oid: string;

    @Prop({ required: false })
    email?: string;

    @Prop({ required: false })
    uid?: string;

    @Prop({ required: true, default: false })
    accepted: boolean;

    @Prop({ required: true })
    invitation: string;

    @Prop({ required: true, default: 'user' })
    role: string;
}

const MemberInvitationSchema = SchemaFactory.createForClass(MemberInvitation);

// Define a virtual property `id` that gets the `_id` value as a string
MemberInvitationSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
MemberInvitationSchema.set('toJSON', {
    virtuals: true,
});

export { MemberInvitationSchema };
