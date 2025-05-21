import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { map, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
})

export class LocationImageService {

    constructor(private apiClient: ApiClientService) {}

    private readonly endpoint = 'LocationImage/'

    public getImageUrlsByLocationId(locationId: number | undefined): Observable<string[]> {
        if (locationId === undefined) {
            return of([]);
        }

        return this.apiClient.get<{ locationImages: { storagePath: string }[] }>(
            this.endpoint + locationId
        ).pipe(
            map(response => response.locationImages.map(image => image.storagePath))
        );
    }
}