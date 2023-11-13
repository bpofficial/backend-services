import type { VaultOptions, client } from 'node-vault';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const vault = require('node-vault');

export const VaultClient: client = vault({
    apiVersion: 'v1',
    endpoint: process.env.VAULT_URI,
} as VaultOptions);

export async function fetchSecret(secretPath: string) {
    try {
        const response = await VaultClient.read(secretPath);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch secret from Vault: ${error.message}`);
        throw error;
    }
}
