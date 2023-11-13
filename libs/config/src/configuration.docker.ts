const env = process.env;

export const dockerConfiguration = () => ({
    prod: false,
    app: {
        uri: env.APP_URI,
    },
    opa: {
        uri: env.OPA_URI,
    },
    mongodb: {
        uri: env.MONGO_URI,
    },
    redis: {
        uri: env.REDIS_URI,
    },
    session: {
        secret: 'development_session_secret',
        resave: true,
        saveUninitialized: true,
        cookie: {
            secure: true,
            httpOnly: true,
            maxAge: 3600000,
        },
    },
    service: {
        account: {
            proto: 'proto/account.proto',
            host: 'account',
            grpcPort: '5003',
            httpPort: '5033',
        },
        auth: {
            httpPort: '5066',
        },
        connection: {
            proto: 'proto/connection.proto',
            host: 'connection',
            grpcPort: '5005',
            httpPort: '5055',
        },
        member: {
            proto: 'proto/member.proto',
            host: 'member',
            grpcPort: '5004',
            httpPort: '5044',
        },
        org: {
            proto: 'proto/org.proto',
            host: 'org',
            grpcPort: '5001',
            httpPort: '5011',
        },
        user: {
            proto: 'proto/user.proto',
            host: 'user',
            grpcPort: '5002',
            httpPort: '5022',
        },
    },
});
