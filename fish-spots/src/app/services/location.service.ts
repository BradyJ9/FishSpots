import { Injectable } from '@angular/core';
import { ApiClientService } from './apiclient.service';
import { LocationDto } from '../../model/dto/LocationDto';
import { Observable } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})

export class LocationService {
    constructor(private apiClientService: ApiClientService) {}

    public getLocationById(id: string): Observable<LocationDto> {
        this.apiClientService.get("")
    }
}