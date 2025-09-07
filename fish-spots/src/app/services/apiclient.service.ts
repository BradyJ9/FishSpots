import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Observable } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})

export class ApiClientService {
    private baseUrl = environment.apiUrl;

    constructor(private httpClient: HttpClient) {
        
    }

    get<T>(endpoint: string): Observable<T> {
        return this.httpClient.get<T>(`${this.baseUrl}/${endpoint}`)
    }

    // Used for health checking, allows us to monitor HTTP status codes
    getResponse(endpoint:string): Observable<HttpResponse<any>> {
        return this.httpClient.get<HttpResponse<any>>(`${this.baseUrl}/${endpoint}`, {observe:'response'});
    }

    post<T>(endpoint: string, data: any): Observable<T> {
        return this.httpClient.post<T>(`${this.baseUrl}/${endpoint}`, data)
    }

    put<T>(endpoint: string, data: any): Observable<T> {
        return this.httpClient.put<T>(`${this.baseUrl}/${endpoint}`, data)
    }
}