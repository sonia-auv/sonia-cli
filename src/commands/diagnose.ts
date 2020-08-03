import { Command, flags } from '@oclif/command'
import { Config } from '../helper/diagnose-config'
import { DiagnosePlatform } from '../models/config/diagnose'
import * as Listr from 'listr'
import { command } from 'execa'
import { Dictionary } from 'lodash'

const actionExpression = new RegExp('\\{\\{(.*?)\\}\\}', 'g')

interface MappedElement<T> {
  name: string;
  data: T;
}

const mapDictionary = <T>(elements: Dictionary<T>): MappedElement<T>[] => Object.entries(elements).map(x => ({ name: x[0], data: x[1] }))

const filteredPlatforms = (() => {
  const result = mapDictionary(Config).filter(x => mapDictionary(x.data.devices).find(y => y.data.diagnose !== undefined) !== undefined)
  // console.log(JSON.stringify(result, undefined, 2))
  return result
})()
// //Config.filter(x => x.devices.find(y => y.diagnose !== undefined) !== undefined)

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
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'platform',
      options: filteredPlatforms.map(x => x.name),
      description: 'Platform to target. None = all',
    },
    {
      name: 'device',
      options: (() => {
        const toto = filteredPlatforms.map(x => x.data.devices)
        console.log(JSON.stringify(toto, undefined, 2))
        const result = filteredPlatforms.map(x => mapDictionary(x.data.devices)).flat(1).filter(x => x.data.diagnose).map(x => x.name)
        return [...new Set(result)]
      })(),
      description: 'Device to target (must be contain in specified platform). None = all',
    },
  ]

  /**
   * Parse args and return
   * @param {string[]} args Additional diagnose command arguments
   * @returns {Platform[]} platforms Platforms to diagnose
   * @returns {string} deviceName Specific device or undefined for all devices
   */
  parseArgs(args: { [name: string]: any }) {
    const platforms: {
      name: string;
      data: DiagnosePlatform;
    }[] = []
    let deviceName: string | undefined
    if (args.platform) {
      const platform = filteredPlatforms.find(x => x.name === args.platform)!
      platforms.push(platform)

      if (args.device) {
        const device = mapDictionary(platform.data.devices).find(x => x.name === args.device && x.data.diagnose)

        if (!device) {
          throw new Error('device is not valid for this platform')
        }

        deviceName = args.device
      }
    } else {
      platforms.push(...filteredPlatforms)
    }
    return { platforms, deviceName }
  }

  platform?: MappedElement<DiagnosePlatform>;

  async run() {
    const { args } = this.parse(Diagnose)
    const { platforms, deviceName } = this.parseArgs(args)

    const platformTasks = new Listr({ concurrent: true, exitOnError: false })

    platforms.forEach(platform => {
      this.platform = platform

      const devices = mapDictionary(platform.data.devices).filter(x => deviceName === undefined || x.name === deviceName)

      const deviceTasks = new Listr({ concurrent: true, exitOnError: false })

      devices.forEach(device => {
        const diagnose = device.data.diagnose

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

    platformTasks.run().catch(() => {
      console.log('Diagnose command failed. Please check error messages.')
    })
  }
}
