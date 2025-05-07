export interface CatchDto {
    readonly id: number;
    readonly outingId: number;
    readonly species: string;
    readonly catchLength: number;
    readonly catchWeight: number;
    readonly likes: number;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}