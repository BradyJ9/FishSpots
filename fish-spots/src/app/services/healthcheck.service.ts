import { Injectable } from "@angular/core";
import { ApiClientService } from "./apiclient.service";
import { map, Observable } from "rxjs";
import { HttpResponse } from "@angular/common/http";

@Injectable ({
    providedIn: 'root'
})

export class HealthCheckService {
    constructor(private apiClientService: ApiClientService) {}

    private readonly healthCheckUrl = 'HealthCheck/';

    public getHealthCheck(): Observable<HttpResponse<any>> {
        return this.apiClientService.getResponse(this.healthCheckUrl);
    }
}