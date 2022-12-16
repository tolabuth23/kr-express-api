import ValueImportRateInterface from "./valueImportRate.interface";

export interface ImportRate {
    name: string;
    value: ValueImportRateInterface;
    status: 'active' | 'inactive'
}