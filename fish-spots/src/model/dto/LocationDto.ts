export interface LocationDto {
    readonly locationId?: number;
    readonly locationName: string;
    readonly locationDescription: string;
    readonly lat: string;
    readonly long: string;
    readonly createdAt?: Date;
    readonly lastUpdatedAt?: Date;
}