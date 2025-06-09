import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { map, Observable, of, from, firstValueFrom } from "rxjs";
import { CatchDto } from "../../model/dto/CatchDto";
import { LocationDto } from "../../model/dto/LocationDto";
import { ImageBlobService } from "./imageblob.service";
import { BlobContainers } from "../../model/enums/BlobContainers";

@Injectable ({
    providedIn: 'root'
})

export class CatchService {
    constructor(private apiClient:ApiClientService, private imageBlobService: ImageBlobService){}

    private readonly catchUrl = 'Catch/';

    //Limited to top 25 catches
    public getAllCatches():Observable<CatchDto[]>{
        return this.apiClient.get<{ catches: CatchDto[] }>(this.catchUrl).pipe(
              map(response => response.catches)
        );
    }

    public getCatchesForOuting$(outingId: number | null):Observable<CatchDto[]>{
        if (outingId == null) {
            return of([])
        }
        return this.apiClient.get<{ catches: CatchDto[] }>(this.catchUrl + "Outing/" + outingId).pipe(
            map(response => response.catches)
        )
    }

    public getCatchLocation(catchId:number | undefined):Observable<LocationDto> {
        if(catchId == undefined){
            return of();
        }
        return this.apiClient.get<{location:LocationDto}>(this.catchUrl + catchId + "/location").pipe(
            map(response => response.location)
        )
    }

    //this function assumes a 1-1 mappingo of images -> catches in their arrays
    public async uploadCatchImagesAndAssignUrl(images: (File | null)[], catches:CatchDto[]) {
        if (!images || !catches) {
            return;
        }

        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            if (image !== null) {
                const imageUrl = await firstValueFrom(this.uploadCatchImage(image));
                catches[i].imageUrl = imageUrl;
            }
        }
    }

    public downloadCatchImageFromSasUrl(url: string) : Observable<string> {
        if (url === '') {
            return of('');
        }

        return new Observable<string>(observer => {
            this.imageBlobService.downloadFile(url)
            .then(result => {
                observer.next(result);
                observer.complete();
            })
            .catch(err => observer.error(err));
        });
    }

    public uploadCatchImage(file: File): Observable<string> {
        return from(this.imageBlobService.uploadFile(BlobContainers.CatchImages, file));
    }

    public updateCatch(cat:CatchDto):Observable<number>{
        return this.apiClient.put<number>(this.catchUrl+cat.catchId, cat);
    }
}

