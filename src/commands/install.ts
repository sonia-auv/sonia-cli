import { Command, flags } from '@oclif/command'
import * as Listr from 'listr'
import { command } from 'execa'
import { Config } from '../helper/install-config'
import { Config as RepoConfig } from '../helper/repository-config'
import { filter } from 'lodash'

const actionExpression = new RegExp('\\{\\{(.*?)\\}\\}', 'g')

const filteredPlatforms = Config.filter(x => x.devices.find(y => y.os !== undefined) !== undefined)

export default class Install extends Command {
  static description = 'Install AUV environment on one of the following platform (Local, AUV7 or AUV8)'

  static examples = [
    '$ sonia install local computer',
    '$ sonia install auv7 computer',
    '$ sonia install auv8 computer',
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
    {
      name: 'device',
      options: [...new Set(filteredPlatforms.map(x => x.devices).flat(1).filter(x => x.os).map(x => x.name))],
      required: true,
      description: 'Device to target',
    },
  ]

  parseArgs(args: { [name: string]: any }) {
    const { platform: platformName, device: deviceName } = args

    const targetPlatform = filteredPlatforms.find(x => x.name === platformName)!

    const otherPlatforms = Config.filter(x => x.name !== platformName)!

    const device = targetPlatform.devices.find(y => y.name === deviceName)
    // // const device = platform.devices.find(x => x.os?.find(y => y.name === deviceName))
    // console.log(platform.devices)
    // console.log(device)

    if (!device) {
      throw new Error('Device is not valid for this platform')
    }

    const os = device.os!.find(x => this.config.platform === x.name)

    if (!os) {
      throw new Error('OS is not valid for this device')
    }

    return { targetPlatform, otherPlatforms, device, os }
  }

  async run() {
    const { args } = this.parse(Install)
    const { otherPlatforms, os } = this.parseArgs(args)
    const installActions = os.actions
    const repoActions = RepoConfig

    const installTasks = new Listr({ concurrent: false, exitOnError: false })
    const repoTasks = new Listr({ concurrent: false, exitOnError: false })

    console.log()

    otherPlatforms.reduce()

    installActions.forEach(action => {
      // const cmd = action.cmd.replace(actionExpression,)

      // console.log(cmd)
    })

    //   installActions.forEach(action => {
    //     installTasks.add({
    //       title: action.name,
    //       task: () => command(action.cmd).catch(error => {
    //         if (error.failed === true) {
    //           this.error(action.errorMessage)
    //         }
    //       }),
    //     })
    //   })

    //   repoActions.forEach(action => {
    //     const cmd = `git clone ${action.url}`
    //     repoTasks.add({
    //       title: action.name,
    //       task: () => command(cmd).catch(error => {
    //         if (error.failed === true) {
    //           this.error(`An error occurred while cloning ${action.name} repository`)
    //         }
    //       }),
    //     })
    //   })
  }
}
