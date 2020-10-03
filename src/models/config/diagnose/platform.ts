import { Platform } from '../common/platform'
import { DiagnoseDevice } from './device'

export interface DiagnosePlatform extends Platform {
  devices: DiagnoseDevice[];
}
