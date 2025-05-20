import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { map, Observable, of } from "rxjs";
import { CatchImageDto } from "../../model/dto/CatchImageDto";

@Injectable ({
    providedIn: 'root'
})

export class CatchImageService {
    constructor(private apiClient:ApiClientService){}

    private readonly catchImageUrl = 'CatchImage/';

    public getCatchImageById$(catchId: number | undefined): Observable<CatchImageDto> {
        if (catchId === undefined) {
            return of();
        }
        return this.apiClient.get<{ catchImage: CatchImageDto }>(this.catchImageUrl + catchId).pipe(
            map(response => response.catchImage)
        );
    }

}