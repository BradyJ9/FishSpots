import { Observable } from "rxjs";
import { LocationDto } from "../../../../model/dto/LocationDto";

export interface ILocationDao {
    getLocations():Observable<LocationDto[]>;
}