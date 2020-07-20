import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { Platform } from '../models/config/install'
import { merge } from 'lodash'

export class InstallConfig {
  config: Platform[];

  constructor(configFolderPath: string) {
    const docCommon = safeLoad(readFileSync(configFolderPath + '/common.yml', 'utf8')) as Platform[]
    const docDiagnose = safeLoad(readFileSync(configFolderPath + '/install.yml', 'utf8')) as Platform[]
    merge(docCommon, docDiagnose)
    this.config = docCommon
  }
}

export const Config = new InstallConfig('./config').config
