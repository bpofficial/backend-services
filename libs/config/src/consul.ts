import { Consul } from 'consul';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const consul = require('consul');

// Create a Consul client to connect to your Consul server
export const consulClient: Consul = new consul();
export const consulKv = new consul.Kv(consulClient);

// Function to fetch service host URL using Consul
export async function getServiceHost(serviceName: string) {
    try {
        // Query Consul for the service's endpoints
        const endpoints =
            await consulClient.catalog.service.nodes<any[]>(serviceName);

        // Pick the first endpoint (you can implement your logic to select an endpoint)
        if (endpoints.length > 0) {
            const { ServiceAddress } = endpoints[0];
            return String(ServiceAddress);
        } else {
            throw new Error(`No healthy instances found for ${serviceName}`);
        }
    } catch (error) {
        console.error(
            `Failed to fetch ${serviceName} URL from Consul: ${error.message}`,
        );
        throw error;
    }
}
