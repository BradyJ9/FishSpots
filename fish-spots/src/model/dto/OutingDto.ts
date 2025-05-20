export interface OutingDto {
    readonly outingId?: number;
    readonly locationId: number;
    readonly outingDate: Date;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly createdAt?: Date;
    readonly lastUpdatedAt?: Date;
}