const DEFAULT_HTTP = '80'
const DEFAULT_GRPC = '50051'

export const serviceConfiguration = (prod = false) => {
    const pathPrefix = prod ? 'proto' : '../../../libs/proto/src';

    // Set defaults in prod
    if (prod && !process.env.HTTP_PORT) {
        process.env.HTTP_PORT = DEFAULT_HTTP;
    }

    if (prod && !process.env.GRPC_PORT) {
        process.env.GRPC_PORT = DEFAULT_GRPC;
    }

    return {
        service: {
            http: createHttpConfig('http', '4000'),
            auth: createHttpConfig('auth', '6000'),
            org: createGrpcConfig('org', '5001', `${pathPrefix}/org.proto`),
            user: createGrpcConfig('user', '5002', `${pathPrefix}/user.proto`),
            account: createGrpcConfig('account', '5003', `${pathPrefix}/account.proto`),
            member: createGrpcConfig('member', '5004', `${pathPrefix}/member.proto`),
            connection: createGrpcConfig('connection', '5005', `${pathPrefix}/connection.proto`),
            notify: createGrpcConfig('notify', '5007', `${pathPrefix}/notify.proto`),
        },
    }
}

function getHttpPort(fallback: string) {
    return process.env.HTTP_PORT || fallback;
}

function getGrpcPort(fallback: string) {
    return process.env.GRPC_PORT || fallback;
}

function createHttpConfig(host: string, httpPort = DEFAULT_HTTP) {
    return {
        host,
        httpPort: getHttpPort(httpPort),
    }
}

function createGrpcConfig(host: string, grpcPort = DEFAULT_GRPC, proto?: string | string[]) {
    return {
        proto,
        host,
        grpcPort: getGrpcPort(grpcPort),
    }
}