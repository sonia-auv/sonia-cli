import { OS } from './os'

export interface DiagnoseConfig {
    name: string;
    successMessage: string;
    errorMessage: string;
    actions: DiagnoseAction[];
}
