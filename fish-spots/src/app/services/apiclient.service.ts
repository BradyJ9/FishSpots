import { HttpClient } from '@angular/common/http';
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

    post<T>(endpoint: string, data: any): Observable<T> {
        return this.httpClient.post<T>(`${this.baseUrl}/${endpoint}`, data)
    }

    put<T>(endpoint: string, data: any): Observable<T> {
        return this.httpClient.put<T>(`${this.baseUrl}/${endpoint}`, data)
    }
}