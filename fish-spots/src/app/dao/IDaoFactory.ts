import { ApiClientService } from "../services/apiclient.service";
import { ILocationDao } from "./ILocationDao";

export interface IDaoFactory {
    createLocationDao(apiClient:ApiClientService):ILocationDao;
}