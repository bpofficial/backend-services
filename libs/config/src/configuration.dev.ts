const env = process.env;

export const devConfiguration = () => ({
    prod: false,
    app: {
        uri: env.APP_URI,
        errorUri: env.APP_URI + '/error',
        loggedInCallbackUri: env.APP_URI,
    },
    opa: {
        uri: env.OPA_URI,
    },
    mongo: {
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
    // The variables like `env.ORG_SERVICE_HOST || env.SERVICE_HOST` allow us to
    // define the variable locally and target it for the service or generally
    // (within a container) when there's no conflicting values.
    service: {
        org: {
            proto: '../../../libs/proto/src/org.proto',
            grpcPort: '5001',
            httpPort: '5011',
        },
        user: {
            proto: '../../../libs/proto/src/user.proto',
            grpcPort: '5002',
            httpPort: '5022',
        },
        account: {
            proto: '../../../libs/proto/src/account.proto',
            grpcPort: '5003',
            httpPort: '5033',
        },
        member: {
            proto: '../../../libs/proto/src/member.proto',
            grpcPort: '5004',
            httpPort: '5044',
        },
        connection: {
            proto: '../../../libs/proto/src/connection.proto',
            grpcPort: '5005',
            httpPort: '5055',
        },
        auth: {
            httpPort: '5066',
        },
    },
});
