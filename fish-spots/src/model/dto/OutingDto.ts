export interface OutingDto {
    readonly outingId?: number;
    readonly locationId: number;
    readonly username: string;
    readonly outingDate: Date;
    readonly startTime: string;
    readonly endTime: string;
    readonly notes?: string;
    readonly createdAt?: Date;
    readonly lastUpdatedAt?: Date;
}