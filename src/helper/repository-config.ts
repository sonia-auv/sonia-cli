import { readFileSync } from 'fs'
import { safeLoad } from 'js-yaml'
import { Repository } from '../models/config/install'

export class RepositoryConfig {
    config: Repository[];

    constructor(configFolderPath: string) {
        const docRepository = safeLoad(readFileSync(configFolderPath + '/install-repository.yml', 'utf8')) as Repository[]
        this.config = docRepository
    }
}

export const Config = new RepositoryConfig('./config').config
