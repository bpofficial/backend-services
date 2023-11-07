const env = process.env;
export const configuration = () => ({
    url: env.APP_URL,
    opa: {
        url: env.OPA_URL,
    },
    service: {
        org: {
            package: env.ORG_PACKAGE,
            proto: env.ORG_PROTO,
            url: env.ORG_URL,
            mongodb: {
                uri: env.ORG_MONGO_URI,
            },
        },
        auth: {
            package: env.AUTH_PACKAGE,
            proto: env.AUTH_PROTO,
            url: env.AUTH_URL,
            mongodb: {
                uri: env.AUTH_MONGO_URI,
            },
        },
        account: {
            package: env.ACCOUNT_PACKAGE,
            proto: env.ACCOUNT_PROTO,
            url: env.ACCOUNT_URL,
            mongodb: {
                uri: env.ACCOUNT_MONGO_URI,
            },
        },
        user: {
            package: env.USER_PACKAGE,
            proto: env.USER_PROTO,
            url: env.USER_URL,
            mongodb: {
                uri: env.USER_MONGO_URI,
            },
        },
        member: {
            package: env.MEMBER_PACKAGE,
            proto: env.MEMBER_PROTO,
            url: env.MEMBER_URL,
            mongodb: {
                uri: env.MEMBER_MONGO_URI,
            },
        },
        connection: {
            package: env.CONNECTION_PACKAGE,
            proto: env.CONNECTION_PROTO,
            url: env.CONNECTION_URL,
            mongodb: {
                uri: env.CONNECTION_MONGO_URI,
            },
        },
    },
});
