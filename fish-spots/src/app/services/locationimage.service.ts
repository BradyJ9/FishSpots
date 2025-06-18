import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { map, Observable, of, tap, from, switchMap, forkJoin } from "rxjs";
import { LocationImageDto } from "../../model/dto/LocationImageDto";
import { ImageBlobService } from "./imageblob.service";

@Injectable({
    providedIn: "root"
})

export class LocationImageService {

    constructor(private apiClient: ApiClientService, private imageBlobService: ImageBlobService) {}

    private readonly endpoint = 'LocationImage/'

    public getImageUrlsByLocationId(locationId: number | undefined): Observable<string[]> {
        if (locationId === undefined) {
            return of([]);
        }

        return this.apiClient.get<{ locationImages: { storagePath: string }[] }>(
            this.endpoint + locationId
        ).pipe(
            // Additional map() converts Promises to Observables for error propagation
            map(response =>
                response.locationImages.map(image =>
                    from(this.imageBlobService.downloadFile(image.storagePath))  // <- Convert each Promise to Observable
                )
            ),
            switchMap(downloads => downloads.length ? forkJoin(downloads) : of([]))
        );
    }

    public insertImageUrl(locationId: number, imageUrl: string) {
        const locImage: LocationImageDto = {
            locationId: locationId,
            storagePath: imageUrl
        };
        this.apiClient.post<LocationImageDto>(this.endpoint, locImage).subscribe({
            next: (res) => console.log('Successfully inserted image URL:', res),
            error: (err) => console.error('Error inserting image URL:', err)
        });
    }
}