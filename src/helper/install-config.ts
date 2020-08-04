import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { InstallPlatform } from '../models/config/install'
import { merge } from 'lodash'

export class InstallConfig {
  config: InstallPlatform[];

  constructor(configFolderPath: string) {
    const docCommon = safeLoad(readFileSync(configFolderPath + '/common.yml', 'utf8')) as InstallPlatform[]
    const docDiagnose = safeLoad(readFileSync(configFolderPath + '/install.yml', 'utf8')) as InstallPlatform[]
    merge(docCommon, docDiagnose)
    this.config = docCommon
  }
}

export const Config = new InstallConfig('./config').config
