import { Command, flags } from '@oclif/command'
import * as Listr from 'listr'
import { command } from 'execa'
import { Config } from '../helper/environment-config'
import { Platform } from '../models/config/install/platform'

enum environment {
  local = 'local',
  auv7 = 'auv7',
  auv8 = 'auv8'
}

const filteredPlatforms = Config

export default class Install extends Command {
  static description = 'Install AUV environment on one of the following platform (Local, AUV7 or AUV8)'

  static examples = [
    '$ sonia install',
    '$ sonia install local',
    '$ sonia install auv7',
    '$ sonia install auv8',
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'platform',
      required: true,
      options: filteredPlatforms.map(x => x.name),
      description: 'Target installation platform',
    },
  ]

  const platformTasks = new Listr({ concurrent: true, exitOnError: false })

  installDocker(os: string) {
    if (os === 'darwin') {

    } else if (os === 'linux') {

    } else if (os === 'win32') {

    }
  }

  installPlatform(env: string, os: string) {
    switch (env) {
      case environment.local: {
        console.log('Env:local')

        break
      }
      case environment.auv7: {
        console.log('Env:auv7')
        break
      }
      case environment.auv8: {
        console.log('Env:auv8')
        break
      }
    }
  }

  async run() {
    const { args } = this.parse(Install)
    const targetPlatform = args.platform
    const targetOS = this.config.platform

    this.installPlatform(targetPlatform, targetArechitecture)

    return true
  }
}
