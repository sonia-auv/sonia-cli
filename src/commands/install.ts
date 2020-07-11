import { Command, flags } from '@oclif/command'
import * as Listr from 'listr'
import { command } from 'execa'

export default class Install extends Command {
  static description = 'Install AUV environment on one of the following plateform (Local, AUV7 or AUV8)'

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
      description: 'Installation target platform',
    },
  ]

  async run() {
    return true
  }
}
