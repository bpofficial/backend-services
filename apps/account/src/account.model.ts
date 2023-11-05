import { Account } from '@app/proto/account';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class AccountModel extends Document implements Omit<Account, 'id'> {
    @Prop({ required: true })
    uid: string;

    @Prop({ required: true })
    cid: string;

    @Prop({ required: false })
    verified: boolean;

    /**
     * Randomly generated data to uniquely identify the account
     */
    @Prop({ required: false })
    verificationToken: string;

    /**
     * Verification expiry timestamp in milliseconds
     */
    @Prop({ required: false })
    verificationExpires: number;
}

const AccountSchema = SchemaFactory.createForClass(AccountModel);

// Define a virtual property `id` that gets the `_id` value as a string
AccountSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
AccountSchema.set('toJSON', {
    virtuals: true,
});

export { AccountSchema };
