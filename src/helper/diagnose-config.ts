import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { DiagnosePlatform } from '../models/config/diagnose'
import { merge } from 'lodash'

export class DiagnoseConfig {
  config: DiagnosePlatform[];

  constructor(configFolderPath: string) {
    const docCommon = safeLoad(readFileSync(configFolderPath + '/common.yml', 'utf8')) as DiagnosePlatform[]
    const docDiagnose = safeLoad(readFileSync(configFolderPath + '/diagnose.yml', 'utf8')) as DiagnosePlatform[]
    merge(docCommon, docDiagnose)
    this.config = docCommon
  }
}

export const Config = new DiagnoseConfig('./config').config
