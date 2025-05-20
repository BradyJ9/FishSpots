import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { Observable, of } from "rxjs";


@Injectable({
    providedIn: "root"
})

export class LocationImageService {

    constructor(private apiClient: ApiClientService) {}

    private readonly endpoint = 'LocationImage/'

    public getImageUrlsByLocationId(locId: number | null): Observable<string[]> {
        if (locId === null) {
            return of([]);
        }
        return this.apiClient.get<string[]>(this.endpoint + locId);
    }
}