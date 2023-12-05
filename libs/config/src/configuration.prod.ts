import { Logger } from '@nestjs/common';
import { consulKv, getServiceHost } from './consul';
import { fetchSecret } from './vault';

const logger = new Logger('Configuration');

export const prodConfiguration = async () => {
    logger.log('Fetching configurations from key stores.');

    return {
        prod: true,
        app: {
            uri: await consulKv.get('config/app_uri'),
            errorUri: await consulKv.get('config/app_error_uri'),
            loggedInCallbackUri: await consulKv.get(
                'config/app_logged_in_cb_uri',
            ),
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
            http: {
                host: await getServiceHost('http-service'),
            },
            org: {
                proto: 'proto/org.proto',
                host: await getServiceHost('org-service'),
            },
            user: {
                proto: 'proto/user.proto',
                host: await getServiceHost('user-service'),
            },
            account: {
                proto: 'proto/account.proto',
                host: await getServiceHost('account-service'),
            },
            member: {
                proto: 'proto/member.proto',
                host: await getServiceHost('member-service'),
            },
            connection: {
                proto: 'proto/connection.proto',
                host: await getServiceHost('connection-service'),
            },
            auth: {
                host: await getServiceHost('auth-service'),
            },
            notify: {
                proto: 'proto/notify.proto',
                host: await getServiceHost('notify-service'),
            },
        },
    };
};
