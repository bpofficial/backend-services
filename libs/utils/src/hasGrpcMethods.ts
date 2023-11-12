export function hasGrpcMethods(controllerClass: any): boolean {
    const methods = Reflect.getMetadata(
        'grpc:methods',
        controllerClass.prototype,
    );
    return methods && methods.length > 0;
}
