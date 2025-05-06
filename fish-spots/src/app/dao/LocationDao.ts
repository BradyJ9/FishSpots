import { map, Observable } from "rxjs";
import { LocationDto } from "../../../../model/dto/LocationDto";
import { ILocationDao } from "./ILocationDao";
import { ApiClientService } from "../services/apiclient.service";

export class LocationDao implements ILocationDao{
    constructor(private readonly apiClient:ApiClientService){

    }

    // Genuinely not sure if this benefits from using an Observable or not
    public getLocations(): Observable<LocationDto[]> {
        return this.apiClient.get<{ locations: LocationDto[] }>("Location").pipe(
            map(response => response.locations)  // Extract 'locations' array from nested reponse
        );
    }
}