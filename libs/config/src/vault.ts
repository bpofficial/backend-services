import Vault from 'node-vault';

export const VaultClient = Vault({
    apiVersion: 'v1',
    endpoint: process.env.VAULT_URI,
});

export async function fetchSecret(secretPath: string) {
    try {
        const response = await VaultClient.read(secretPath);
        return response.data;
    } catch (error) {
        console.error(`Failed to fetch secret from Vault: ${error.message}`);
        throw error;
    }
}
