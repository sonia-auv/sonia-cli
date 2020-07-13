import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { ExecutePlatform } from '../models/config/execute'
import { merge } from 'lodash'

export class ExecuteConfig {
  config: ExecutePlatform[];

  constructor(configFolderPath: string) {
    const docCommon = safeLoad(readFileSync(configFolderPath + '/common.yml', 'utf8')) as ExecutePlatform[]
    const docExecute = safeLoad(readFileSync(configFolderPath + '/execute.yml', 'utf8')) as ExecutePlatform[]
    merge(docCommon, docExecute)
    this.config = docCommon
  }
}

export const Config = new ExecuteConfig('./config').config
