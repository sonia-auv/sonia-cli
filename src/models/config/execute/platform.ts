import { ExecuteDevice } from './device'
import { Platform } from '../common/platform'

export interface ExecutePlatform extends Platform {

    devices: ExecuteDevice[];
}
