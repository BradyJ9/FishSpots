export interface CatchDto {
    //TODO: Change to better match HTML response fields once API is set up
    readonly id: number;
    readonly outingId: number;
    readonly species: string;
    readonly catchLength: number;
    readonly catchWeight: number;
    readonly likes: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}