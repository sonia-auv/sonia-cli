import { DiagnoseConfig } from './DiagnoseConfig';
import { ExecuteConfig } from './ExecuteConfig';

export interface Device {
    name: string
    ip: string
    diagnose?: DiagnoseConfig
    execute?: ExecuteConfig[]
}