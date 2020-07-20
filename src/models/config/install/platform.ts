import { Platform } from '../common/platform'
import { InstallDevice } from './device'
export interface InstallPlatform extends Platform {
  devices: InstallDevice[];
}
