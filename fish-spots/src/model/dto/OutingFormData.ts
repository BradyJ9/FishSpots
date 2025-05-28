import { CatchDto } from "./CatchDto";

export interface OutingFormData {
    date: Date,
    startTime: string,
    endTime: string,
    catches: CatchDto[],
    notes: string
}