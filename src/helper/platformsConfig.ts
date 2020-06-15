import { readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';

export interface IDevice {
    name: string
    ip: string
}

export interface IPlatform {
    name: string
    devices: IDevice[]
}

export class PlatformsConfig {

    config: IPlatform[];

    constructor(configFilePath: string) {
        const doc = safeLoad(readFileSync(configFilePath, 'utf8')) as IPlatform[];
        this.config = doc;
    }

}

export const Config = new PlatformsConfig('config/devices.yml').config;