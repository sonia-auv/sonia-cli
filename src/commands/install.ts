import { Command, flags } from '@oclif/command'
import * as Listr from 'listr'
import { command } from 'execa'
import { Config } from '../helper/install-config'
import { Platform } from '../models/config/install/platform'

enum environment {
  local = 'local',
  auv7 = 'auv7',
  auv8 = 'auv8'
}

const filteredPlatforms = Config.filter(x => x.devices.find(y => y.os !== undefined) !== undefined)

const filteredInstallTasks =

export default class Install extends Command {
  static description = 'Install AUV environment on one of the following platform (Local, AUV7 or AUV8)'

  static examples = [
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

  tasks = new Listr({ concurrent: false, exitOnError: false })

  createTask(taskName: string, cmd: () => Promise<any>, errorMessage: string) {
    this.tasks.add({
      title: name,
      task: () => cmd().catch(error => {
        if (error.failed === true) {
          this.error(errorMessage)
        }
      }),
    })
  }

  // installLocalEnvironment(os: string) {
  //   if (os === 'darwin') {

  //   } else if (os === 'linux') {
  //     // this.createTask('Update system packages', () => command('sudo apt update && sudo apt upgrade -y'), 'An error occurred while updating system packages')
  //     // this.createTask('Install git', () => command('sudo apt install git'), 'An error occurred while installing git')
  //     // this.createTask('Generate SSH Key', () => command("ssh-keygen -q -t rsa -N '' -f ~/.ssh/id_rsa <<<y 2>&1 >/dev/null"), 'An error occurred while generating an SSH key')
  //     // this.createTask('Copy SSH key to your github profile (press enter when completed)', () => command('readline'), 'An error occurred during this step')
  //     // this.createTask('Installing docker requirements')

  //     // createTask("Clone sonia modules", () => {
  //     //   repos.forEach(x => command(`git clone ${x.url}`)
  //     //   )
  //     // }, "An error occurred while cloning sonia modules")
  //   } else if (os === 'win32') {

  //   }
  // }

  // installPlatform(env: string, os: string) {
  //   switch (env) {
  //     case environment.local: {
  //       console.log('Env:local')
  //       this.installLocalEnvironment(os)
  //       break
  //     }
  //     case environment.auv7: {
  //       console.log('Env:auv7')
  //       break
  //     }
  //     case environment.auv8: {
  //       console.log('Env:auv8')
  //       break
  //     }
  //   }
  // }

  async run() {
    const { args } = this.parse(Install)
    const targetPlatform = args.platform
    const targetOS = this.config.platform

    // this.installPlatform(targetPlatform, targetOS)

    return true
  }
}
