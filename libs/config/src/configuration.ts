const env = process.env;
export const configuration = () => ({
    url: env.APP_GRPC_PORT,
    opa: {
        url: env.OPA_GRPC_PORT,
    },
    common: {
        redis: {
            host: env.REDIS_HOST,
            port: parseInt(env.REDIS_PORT || '6739'),
        },
        session: {
            secret: env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true,
                httpOnly: true,
                maxAge: parseInt(env.SESSION_MAX_AGE || '3600000'),
            },
        },
    },
    service: {
        org: {
            package: env.ORG_PACKAGE,
            proto: env.ORG_PROTO,
            grpcPort: env.ORG_GRPC_PORT,
            httpPort: env.ORG_HTTP_PORT,
            mongodb: {
                uri: env.ORG_MONGO_URI,
            },
        },
        auth: {
            httpPort: env.AUTH_HTTP_PORT,
            mongodb: {
                uri: env.AUTH_MONGO_URI,
            },
        },
        account: {
            package: env.ACCOUNT_PACKAGE,
            proto: env.ACCOUNT_PROTO,
            grpcPort: env.ACCOUNT_GRPC_PORT,
            httpPort: env.ACCOUNT_HTTP_PORT,
            mongodb: {
                uri: env.ACCOUNT_MONGO_URI,
            },
        },
        user: {
            package: env.USER_PACKAGE,
            proto: env.USER_PROTO,
            grpcPort: env.USER_GRPC_PORT,
            httpPort: env.USER_HTTP_PORT,
            mongodb: {
                uri: env.USER_MONGO_URI,
            },
        },
        member: {
            package: env.MEMBER_PACKAGE,
            proto: env.MEMBER_PROTO,
            grpcPort: env.MEMBER_GRPC_PORT,
            httpPort: env.MEMBER_HTTP_PORT,
            mongodb: {
                uri: env.MEMBER_MONGO_URI,
            },
        },
        connection: {
            package: env.CONNECTION_PACKAGE,
            proto: env.CONNECTION_PROTO,
            grpcPort: env.CONNECTION_GRPC_PORT,
            httpPort: env.CONNECTION_HTTP_PORT,
            mongodb: {
                uri: env.CONNECTION_MONGO_URI,
            },
        },
    },
});
