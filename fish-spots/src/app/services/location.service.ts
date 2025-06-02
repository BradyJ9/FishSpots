import { Injectable } from '@angular/core';
import { ApiClientService } from './apiclient.service';
import { LocationDto } from '../../model/dto/LocationDto';
import { map, Observable } from 'rxjs';
import { OutingDto } from '../../model/dto/OutingDto';
import { CatchDto } from '../../model/dto/CatchDto';

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

    public insertOutingByLocationId(locationId : number, outing : OutingDto, catches : CatchDto[]) {
        return this.apiClientService.post<number>(this.locationUrl + locationId + "/" + "Outing", {outing, catches})
    }
}