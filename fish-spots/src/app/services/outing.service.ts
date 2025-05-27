import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { OutingDto } from "../../model/dto/OutingDto";
import { map, Observable, of } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class OutingService {
    constructor(private apiClient: ApiClientService) {}

    private readonly outingUrl = 'Outing/';

    public getOutingsByLocationId$(locId: string | null): Observable<OutingDto[]> {
        if (locId === undefined || locId === null || locId === '') {
            return of([]);
        }
        return this.apiClient.get<{outings: OutingDto[] }>(this.outingUrl + 'Location/' + locId).pipe(
            map(response => response.outings)
        );
    }

    public insertOuting(outing:OutingDto): Observable<number> {
        return this.apiClient.post<number>(this.outingUrl,outing);
    }
}