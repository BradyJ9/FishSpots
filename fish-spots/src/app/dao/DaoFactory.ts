import { ApiClientService } from "../services/apiclient.service";
import { IDaoFactory } from "./IDaoFactory";
import { ILocationDao } from "./ILocationDao";
import { LocationDao } from "./LocationDao";

export class DaoFactory implements IDaoFactory {
    createLocationDao(apiClient: ApiClientService): ILocationDao {
        return new LocationDao(apiClient);
    }
} 