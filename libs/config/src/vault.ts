import Vault from 'node-vault';

export const VaultClient = Vault({
    apiVersion: '',
    endpoint: process.env.VAULT_URI,
});

export async function fetchSecret(secretPath: string) {
    try {
        const response = await VaultClient.read(secretPath);
        return response.data; // Assuming secrets are stored as key-value pairs
    } catch (error) {
        console.error(`Failed to fetch secret from Vault: ${error.message}`);
        throw error;
    }
}
