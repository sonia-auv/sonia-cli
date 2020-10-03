import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { ExecutePlatform } from '../models/config/execute'
import { merge } from 'lodash'
import * as path from 'path'

export class ExecuteConfig {
  config: ExecutePlatform[];

  constructor(configFolderPath: string) {
    const docCommon = safeLoad(readFileSync(configFolderPath + '/common.yml', 'utf8')) as ExecutePlatform[]
    const docExecute = safeLoad(readFileSync(configFolderPath + '/execute.yml', 'utf8')) as ExecutePlatform[]
    merge(docCommon, docExecute)
    const result = Object.entries(docCommon).map(x => ({ ...(x[1]), devices: [...(Object.entries(x[1].devices).map(y => ({ ...(y[1]), name: y[0] })))], name: x[0] }))

    this.config = result
  }
}


const  configPath = path.join(__dirname,"..", '..', 'config');
export const Config = new ExecuteConfig(configPath).config
