export interface OutingDto {
    //TODO: Change to better match HTML response fields once API is set up
    readonly outingId?: number;
    readonly locationId: number;
    readonly outingDate: Date;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
}