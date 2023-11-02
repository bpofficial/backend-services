const env = process.env;
export const configuration = () => ({
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
    },
});
