export const configuration = () => ({
    opa: {
        url: process.env.OPA_URL || 'http://localhost:8181',
    },
    service: {
        org: {
            package: 'org',
            proto: 'libs/proto/src/org.proto',
            url: 'localhost:5000',
        },
    },
});
