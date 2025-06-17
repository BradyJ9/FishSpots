
export const environment = {
      production: true,
      apiUrl: 'https://fish-spots-hrb5ahbzdqdqarfe.westus2-01.azurewebsites.net/api',
      blob: {
        accountName: 'your-prod-account-name',
        sasToken: '?sv=...', // Use SAS token or managed identity in production
        blobUrl: 'https://your-prod-account-name.blob.core.windows.net'
      }
    };
    