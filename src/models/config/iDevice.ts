import {IDiagnoseConfig} from './iDiagnoseConfig'

export interface IDevice {
    name: string;
    ip: string;
    diagnose?: IDiagnoseConfig;
}
