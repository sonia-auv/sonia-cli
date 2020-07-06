import {readFileSync} from 'fs'
import {safeLoad} from 'js-yaml'
import {Platform} from '../models/config'

export class PlatformsConfig {
    config: Platform[];

    constructor(configFilePath: string) {
      const doc = safeLoad(readFileSync(configFilePath, 'utf8')) as Platform[]
      this.config = doc
    }
}

export const Config = new PlatformsConfig('./config/devices.yml').config
