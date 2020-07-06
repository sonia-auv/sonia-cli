import { DiagnoseConfig } from './diagnose-config'
import { ExecuteConfig } from './execute-config'

export interface Device {
  name: string;
  ip: string;
  diagnose?: DiagnoseConfig;
  execute?: ExecuteConfig[];
}
