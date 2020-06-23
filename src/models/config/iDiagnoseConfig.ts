import {IDiagnoseAction} from './iDiagnoseAction'

export interface IDiagnoseConfig {
    name: string;
    successMessage: string;
    errorMessage: string;
    actions: IDiagnoseAction[];
}
