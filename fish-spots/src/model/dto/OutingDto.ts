export interface OutingDto {
    //TODO: Change to better match HTML response fields once API is set up
    readonly id: number;
    readonly locId: number;
    readonly date: Date;
    readonly startTime: Date;
    readonly endTime: Date;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}