import { Device } from '../common/device'
import { DiagnoseConfig } from '.'

export interface DiagnoseDevice extends Device {
  diagnose?: DiagnoseConfig;
}
