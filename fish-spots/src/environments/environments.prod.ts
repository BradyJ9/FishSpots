
export const environment = {
      production: true,
      apiUrl: 'https://api.yourdomain.com/api',
      blob: {
        accountName: 'your-prod-account-name',
        sasToken: '?sv=...', // Use SAS token or managed identity in production
        blobUrl: 'https://your-prod-account-name.blob.core.windows.net'
      }
    };
    