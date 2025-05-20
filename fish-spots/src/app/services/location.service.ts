import { Injectable } from '@angular/core';
import { ApiClientService } from './apiclient.service';
import { LocationDto } from '../../model/dto/LocationDto';
import { map, Observable } from 'rxjs';

@Injectable ({
    providedIn: 'root'
})

export class LocationService {
    constructor(private apiClientService: ApiClientService) {}

    private readonly locationUrl = 'Location/';

    public getAllLocations(): Observable<LocationDto[]> {
        return this.apiClientService.get<{locations: LocationDto[]}>(this.locationUrl).pipe(
            map(response => response.locations)
        );
    }

    public getLocationById(id: string): Observable<LocationDto> {
        return this.apiClientService.get<{location:LocationDto}>(this.locationUrl + id).pipe(
            map(response => response.location)
        );
    }

    public insertLocation(location:LocationDto): Observable<number> {
        return this.apiClientService.post<number>(this.locationUrl,location);
    }
}