import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { DiagnosePlatform } from '../models/config/diagnose'
import { merge } from 'lodash'

export class DiagnoseConfig {
  config: { [id: string]: DiagnosePlatform };

  constructor(configFolderPath: string) {
    const docCommon = safeLoad(readFileSync(configFolderPath + '/common.yml', 'utf8')) as { [id: string]: DiagnosePlatform }
    const docDiagnose = safeLoad(readFileSync(configFolderPath + '/diagnose.yml', 'utf8')) as { [id: string]: DiagnosePlatform }
    merge(docCommon, docDiagnose)
    
    this.config = docCommon
  }
}

export const Config = new DiagnoseConfig('./config').config
