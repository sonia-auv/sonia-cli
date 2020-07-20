import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { Platform } from '../models/config/diagnose'

export class EnvironmentConfig {
  config: Platform[];

  constructor(configFilePath: string) {
    const doc = safeLoad(readFileSync(configFilePath, 'utf8')) as Platform[]
    this.config = doc
  }
}

export const Config = new EnvironmentConfig('./config/install.yml').config
