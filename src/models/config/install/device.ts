import { OS } from './os'
import { Device } from '../common/device'
export interface InstallDevice extends Device {
    os?: OS[];
}
