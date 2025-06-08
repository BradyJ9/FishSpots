export interface CatchDto {
    readonly catchId?: number;
    readonly outingId: number;
    readonly species: string;
    readonly catchLength?: number;
    readonly catchWeight?: number;
    readonly likes: number;
    imageUrl?: string;
    readonly createdAt?: Date;
    readonly lastUpdatedAt?: Date;
}