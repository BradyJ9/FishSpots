import { Injectable } from '@angular/core';
import { ApiClientService } from './apiclient.service';
import { LocationDto } from '../../model/dto/LocationDto';
import { Observable } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})

export class LocationService {
    constructor(private apiClientService: ApiClientService) {}

    private readonly locationUrl = 'Location/';

    public getLocationById(id: string): Observable<LocationDto> {
        console.log("getting " + id);
        return this.apiClientService.get(this.locationUrl + id);
    }
}