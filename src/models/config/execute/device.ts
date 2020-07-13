import { ExecuteConfig } from './execute-config'
import { Device } from '../common/device'

export interface ExecuteDevice extends Device {
    execute?: ExecuteConfig[];
}
