import { Device } from './Device'

export interface Platform {
    name: string
    devices: Device[]
}