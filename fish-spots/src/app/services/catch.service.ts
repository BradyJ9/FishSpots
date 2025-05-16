import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { map, Observable, of } from "rxjs";
import { CatchDto } from "../../model/dto/CatchDto";

@Injectable ({
    providedIn: 'root'
})

export class CatchService {
    constructor(private apiClient:ApiClientService){}

    private readonly catchUrl = 'Catch/';

    //TODO: in the future this could get large, we'll need to re-evaluate how many we need at a time
    public getAllCatches():Observable<CatchDto[]>{
        return this.apiClient.get<{ catches: CatchDto[] }>(this.catchUrl).pipe(
              map(response => response.catches)
        );
    }

    public getCatchesForOuting$(outingId: number | null):Observable<CatchDto[]>{
        if (outingId == null) {
            return of([])
        }
        return this.apiClient.get<{ catches: CatchDto[] }>("Outing/" + outingId).pipe(
            map(response => response.catches)
        )
    }
}

