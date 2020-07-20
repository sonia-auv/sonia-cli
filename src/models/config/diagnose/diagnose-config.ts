import { DiagnoseAction } from '.'

export interface DiagnoseConfig {
    name: string;
    successMessage: string;
    errorMessage: string;
    actions: DiagnoseAction[];
}
