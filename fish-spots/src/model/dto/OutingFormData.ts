import { CatchDto } from "./CatchDto";

export interface OutingFormData {
    username: string,
    date: Date,
    startTime: string,
    endTime: string,
    catches: CatchDto[],
    notes: string
}