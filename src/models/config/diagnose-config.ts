import {DiagnoseAction} from './diagnose-action'

export interface DiagnoseConfig {
    name: string;
    successMessage: string;
    errorMessage: string;
    actions: DiagnoseAction[];
}
