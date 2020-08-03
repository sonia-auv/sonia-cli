import { Device } from './device'

export interface Platform {
    name: string;
    devices: { [id: string]: Device };
}
