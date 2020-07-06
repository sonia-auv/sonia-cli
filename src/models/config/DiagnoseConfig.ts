import { DiagnoseAction } from './DiagnoseAction';

export interface DiagnoseConfig {
    name: string;
    successMessage: string;
    errorMessage: string;
    actions: DiagnoseAction[];
}