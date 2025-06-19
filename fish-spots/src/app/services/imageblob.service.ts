import { Injectable } from "@angular/core";
import { environment } from "../../environments/environments";
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

@Injectable({
    providedIn: 'root'
})

export class ImageBlobService {

    public blobServiceClient: BlobServiceClient | null = null;
    private baseUrl = environment.apiUrl;
    private blobController = "Blob";

    constructor() {}

    private async getSasUrl(containerName: string, fileName: string): Promise<string> {
        var url = `${this.baseUrl}/${this.blobController}`;
        const params = new URLSearchParams({
            containerName: containerName,
            blobName: fileName
        });
        const response = await fetch(`${url}?${params.toString()}`);
        if (!response.ok) {
            throw new Error('Failed to fetch the SAS token at ' + url);
        }
        const { sasUrl } = await response.json();
        console.log(sasUrl);
        return sasUrl;
    }

    private getFileWithTimestampInName(file: File) : File {
        const timestamp = Date.now();
        const extension = file.name.includes('.') ? file.name.substring(file.name.lastIndexOf('.')) : '';
        const baseName = file.name.replace(extension, '');
        const fileNameWithTimestamp = `${baseName}_${timestamp}${extension}`;
        const fileWithTimestamp = new File([file], fileNameWithTimestamp, { type: file.type });
        return fileWithTimestamp;
    }

    public async uploadFile(containerName: string, file: File): Promise<string> {
        var fileWithTimestamp = this.getFileWithTimestampInName(file);

        var sasUrl = await this.getSasUrl(containerName, fileWithTimestamp.name);
        var blockBlobClient = new BlockBlobClient(sasUrl);
        try {
            await blockBlobClient.uploadData(fileWithTimestamp, {
                blobHTTPHeaders: { blobContentType: fileWithTimestamp.type }
            });
        } catch (error) {
            console.error("Upload failed:", error);
            throw error;
        }
        const blobUrl = blockBlobClient.url;
        console.log(`Uploaded "${fileWithTimestamp.name}" to Azure at ${blobUrl}.`);
        return `${containerName}/${fileWithTimestamp.name}`;
    }

    public async downloadFile(imageUrl: string): Promise<string> {
        //image urls will be stored as [containerName]/[blobName + timestamp] in the database
        const [containerName, blobName] = imageUrl.split('/');
        return await this.getSasUrl(containerName, blobName);
    }
}