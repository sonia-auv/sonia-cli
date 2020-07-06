import {Command, flags} from '@oclif/command'
import {Config} from '../helper/platformsConfig'
import {Platform, DiagnoseAction} from '../models/config'
import {exception, error} from 'console'
import * as Listr from 'listr'
import {command} from 'execa'

const actionExpression = new RegExp('\\{\\{(.*?)\\}\\}', 'g')

const replacement = () => {
  console.log(replacement.caller)
  return (_: string, group1: string) => eval(group1)
}

const FilteredPlatforms = Config.filter(x => x.devices.find(y => y.diagnose !== undefined) !== undefined)

export default class Diagnose extends Command {
  static description = 'Diagnose the system, specific platform and/or device(s)'

  static examples = [
    '$ sonia diagnose',
    '$ sonia diagnose dockbox',
    '$ sonia diagnose auv7',
    '$ sonia diagnose auv7 dvl',
    '$ sonia diagnose auv8 computer',
  ]

  static flags = {
    help: flags.help({char: 'h'}),
  }

  static args = [
    {
      name: 'platform',
      options: FilteredPlatforms.map(x => x.name),
      description: 'Platform to target. None = all',
    },
    {
      name: 'device',
      options: [...new Set(FilteredPlatforms.map(x => x.devices).flat(1).map(x => x.name))],
      description: 'Device to target (must be contain in specified platform). None = all',
    },
  ]

  /**
   * Parse args and return
   * @param args
   * @returns platforms   Platforms to diagnose
   * @returns deviceName  Specific device or undefined for all devices
   */
  parseArgs(args: { [name: string]: any }) {
    const platforms: Platform[] = []
    let deviceName: string | undefined
    if (args.platform) {
      const platform = FilteredPlatforms.find(x => x.name == args.platform)!
      platforms.push(platform)

      if (args.device) {
        const device = platform.devices.find(x => x.name === args.device && x.diagnose)

        if (!device) {
          throw 'device is not valid for this platform'
        }

        deviceName = args.device
      }
    } else {
      platforms.push(...FilteredPlatforms)
    }
    return {platforms, deviceName}
  }

  platform?: Platform;

  async run() {
    const {args, flags} = this.parse(Diagnose)
    const {platforms, deviceName} = this.parseArgs(args)

    const platformTasks = new Listr({concurrent: true, exitOnError: false})

    platforms.forEach(platform => {
      this.platform = platform

      const devices = platform.devices.filter(x => deviceName === undefined || x.name === deviceName)

      const deviceTasks = new Listr({concurrent: true, exitOnError: false})

      devices.forEach(device => {
        const diagnose = device.diagnose

        if (diagnose !== undefined) {
          const actions = diagnose.actions

          const tasks = new Listr()

          const name = device.name.replace(actionExpression, (_, group1) => eval(group1))

          // Loop through every actions contained in a device
          actions.forEach(action => {
            const name = action.name.replace(actionExpression, (_, group1) => eval(group1))
            const cmd = action.cmd.replace(actionExpression, (_, group1) => eval(group1))
            const errorMessage = action.errorMessage.replace(actionExpression, (_, group1) => eval(group1))

            // Create and queue actions as task
            tasks.add({
              title: name,
              task: () => command(cmd).catch(error => {
                if (error.failed === true) {
                  this.error(errorMessage)
                }
              }),
            })
          })
          deviceTasks.add({
            title: name,
            task: () => tasks,
          })
        }
      })
      platformTasks.add({
        title: platform.name,
        task: () => deviceTasks,
      })
    })

    console.log('Starting diagnose command with specified arguments:')

    platformTasks.run().catch(err => {
      console.log('Diagnose command failed. Please check error messages.')
    })
  }
}
