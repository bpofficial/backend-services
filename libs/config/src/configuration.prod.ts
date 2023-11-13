import { consulKv, getServiceHost } from './consul';
import { fetchSecret } from './vault';

export const prodConfiguration = async () => {
    return {
        prod: true,
        app: {
            uri: await consulKv.get('config/app_uri'),
        },
        opa: {
            uri: await consulKv.get('config/opa_uri'),
        },
        mongo: {
            uri: await consulKv.get('config/mongo_uri'),
        },
        redis: {
            uri: await consulKv.get('config/redis_uri'),
        },
        session: {
            secret: await fetchSecret(`secrets/session_secret`),
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true,
                httpOnly: true,
                maxAge: parseInt(
                    (await consulKv.get('config/session/max_age')) || '3600000',
                ),
            },
        },
        service: {
            org: {
                proto: 'proto/org.proto',
                host: await getServiceHost('org-service'),
            },
            auth: {
                host: await getServiceHost('auth-service'),
            },
            account: {
                proto: 'proto/account.proto',
                host: await getServiceHost('account-service'),
            },
            user: {
                proto: 'proto/user.proto',
                host: await getServiceHost('user-service'),
            },
            member: {
                proto: 'proto/member.proto',
                host: await getServiceHost('member-service'),
            },
            connection: {
                proto: 'proto/connection.proto',
                host: await getServiceHost('connection-service'),
            },
        },
    };
};
