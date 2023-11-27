import { Connection, ConnectionType } from '@app/proto/connection';

export const mockConnection: Connection = {
    id: 'connection1',
    oid: 'org1',
    name: 'Test Connection',
    key: 'test-connection',
    type: ConnectionType.OIDC,
    config: {
        oidc: {
            clientId: '',
            clientSecret: '',
            issuer: '',
            authorizationURL: '',
            tokenURL: '',
            callbackURL: '',
            userInfoURL: '',
            scopes: [],
        },
    },
    token: {
        issuer: '',
        audience: '',
        expiry: 86400,
        refresh: true,
        secret: '',
        refreshExpiry: 86400,
    },
};
