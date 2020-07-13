import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { Platform } from '../models/config/diagnose'
import { merge } from 'lodash'

export class DiagnoseConfig {
  config: Platform[];

  constructor(configFolderPath: string) {
    const docCommon = safeLoad(readFileSync(configFolderPath + '/common.yml', 'utf8')) as Platform[]
    const docDiagnose = safeLoad(readFileSync(configFolderPath + '/diagnose.yml', 'utf8')) as Platform[]
    merge(docCommon, docDiagnose)
    this.config = docCommon
  }
}

export const Config = new DiagnoseConfig('./config').config
