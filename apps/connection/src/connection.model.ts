import {
    Connection,
    ConnectionConfig,
    ConnectionType,
    TokenOptions,
} from '@app/proto/connection';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ toJSON: { virtuals: true } })
export class ConnectionModel
    extends Document
    implements Omit<Connection, 'id'>
{
    @Prop({ required: true })
    oid: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    key: string;

    @Prop({ required: true })
    type: ConnectionType;

    @Prop({ required: true })
    config: ConnectionConfig;

    @Prop({ required: true })
    token: TokenOptions;
}

const ConnectionSchema = SchemaFactory.createForClass(ConnectionModel);

// Define a virtual property `id` that gets the `_id` value as a string
ConnectionSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtual fields are serialised.
ConnectionSchema.set('toJSON', {
    virtuals: true,
});

export { ConnectionSchema };
