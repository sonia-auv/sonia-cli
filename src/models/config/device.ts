import { DiagnoseConfig, ExecuteConfig } from '.';

export interface Device {
  name: string;
  ip: string;
  diagnose?: DiagnoseConfig;
  execute?: ExecuteConfig[];
}
