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
        org: {
            proto: 'proto/org.proto',
            grpcPort: '5001',
            httpPort: '5011',
        },
        user: {
            proto: 'proto/user.proto',
            grpcPort: '5002',
            httpPort: '5022',
        },
        account: {
            proto: 'proto/account.proto',
            grpcPort: '5003',
            httpPort: '5033',
        },
        member: {
            proto: 'proto/member.proto',
            grpcPort: '5004',
            httpPort: '5044',
        },
        connection: {
            proto: 'proto/connection.proto',
            grpcPort: '5005',
            httpPort: '5055',
        },
        auth: {
            httpPort: '5066',
        },
    },
});
