const env = process.env;
export const configuration = () => ({
    url: env.APP_URL,
    opa: {
        url: env.OPA_URL,
    },
    common: {
        cookie: {
            secret: env.AUTH_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true,
                httpOnly: true,
                maxAge: 3600000,
            },
        },
    },
    service: {
        org: {
            package: env.ORG_PACKAGE,
            proto: env.ORG_PROTO,
            url: env.ORG_URL,
            httpPort: env.ORG_HTTP_PORT,
            mongodb: {
                uri: env.ORG_MONGO_URI,
            },
        },
        auth: {
            package: env.AUTH_PACKAGE,
            proto: env.AUTH_PROTO,
            url: env.AUTH_URL,
            httpPort: env.AUTH_HTTP_PORT,
            mongodb: {
                uri: env.AUTH_MONGO_URI,
            },
        },
        account: {
            package: env.ACCOUNT_PACKAGE,
            proto: env.ACCOUNT_PROTO,
            url: env.ACCOUNT_URL,
            httpPort: env.ACCOUNT_HTTP_PORT,
            mongodb: {
                uri: env.ACCOUNT_MONGO_URI,
            },
        },
        user: {
            package: env.USER_PACKAGE,
            proto: env.USER_PROTO,
            url: env.USER_URL,
            httpPort: env.USER_HTTP_PORT,
            mongodb: {
                uri: env.USER_MONGO_URI,
            },
        },
        member: {
            package: env.MEMBER_PACKAGE,
            proto: env.MEMBER_PROTO,
            url: env.MEMBER_URL,
            httpPort: env.MEMBER_HTTP_PORT,
            mongodb: {
                uri: env.MEMBER_MONGO_URI,
            },
        },
        connection: {
            package: env.CONNECTION_PACKAGE,
            proto: env.CONNECTION_PROTO,
            url: env.CONNECTION_URL,
            httpPort: env.CONNECTION_HTTP_PORT,
            mongodb: {
                uri: env.CONNECTION_MONGO_URI,
            },
        },
    },
});
