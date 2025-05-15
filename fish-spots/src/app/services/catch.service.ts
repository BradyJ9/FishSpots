import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { map, Observable } from "rxjs";
import { CatchDto } from "../../model/dto/CatchDto";

@Injectable ({
    providedIn: 'root'
})

export class CatchService {
    constructor(private apiClient:ApiClientService){}

    private readonly catchUrl = 'Catch/';

    public getAllCatches():Observable<CatchDto[]>{
        return this.apiClient.get<{ catches: CatchDto[] }>(this.catchUrl).pipe(
              map(response => response.catches)
        );
    }
}

