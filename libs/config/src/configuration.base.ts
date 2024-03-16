import { serviceConfiguration } from './service-config';

export const baseConfiguration = (prod = false) => {
    // Get env here to ensure we can load dotenv before this is called if needed (i.e. dev environments)
    const env = process.env;
    return {
        prod,
        app: {
            uri: env.APP_URI,
            errorUri: env.APP_URI + '/error',
            loggedInCallbackUri: env.APP_URI,
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
            secret: env.SESSION_SECRET,
            resave: true,
            saveUninitialized: true,
            cookie: {
                secure: true,
                httpOnly: true,
                maxAge: 3600000,
            },
        },
        ...serviceConfiguration(prod)
    }
};
