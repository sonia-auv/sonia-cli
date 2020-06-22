import { IDiagnoseConfig } from './iDiagnoseConfig';
import { IExecuteConfig } from './iExecuteConfig';

export interface IDevice {
    name: string
    ip: string
    diagnose?: IDiagnoseConfig
    execute?: IExecuteConfig[]
}