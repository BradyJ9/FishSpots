import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { map, Observable, of } from "rxjs";
import { CatchDto } from "../../model/dto/CatchDto";
import { LocationDto } from "../../model/dto/LocationDto";

@Injectable ({
    providedIn: 'root'
})

export class CatchService {
    constructor(private apiClient:ApiClientService){}

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

    public updateCatch(cat:CatchDto):Observable<number>{
        return this.apiClient.put<number>(this.catchUrl+cat.catchId, cat);
    }
}

