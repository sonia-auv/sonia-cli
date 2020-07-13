import { Command, flags } from '@oclif/command'
import { Config } from '../helper/execute-config'
import { execSync } from 'child_process'

const actionExpression = new RegExp('\\{\\{(.*?)\\}\\}', 'g')

const filteredPlatforms = Config.filter(x => x.devices.find(y => y.execute))

export default class Execute extends Command {
  static description = 'Execute a command to a remote device';

  static aliases = ['exec'];

  static examples = [
    '$ sonia execute auv7 computer ssh',
    '$ sonia execute auv7 computer shutdown',
    '$ sonia execute auv8 computer reboot',
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'platform',
      options: filteredPlatforms.map(x => x.name),
      required: true,
      description: 'Platform to target',
    },
    {
      name: 'device',
      options: [...new Set(filteredPlatforms.map(x => x.devices).flat(1).filter(x => x.execute).map(x => x.name))],
      required: true,
      description: 'Device to target',
    },
    {
      name: 'cmd',
      options: [...new Set(filteredPlatforms.map(x => x.devices).flat(1).filter(x => x.execute).map(x => x.execute!).flat(1).map(x => x.name))],
      required: true,
      description: 'Command to execute (must be contain in specified platform-device)',
    },
  ]

  /**
   * Parse args and return
   * @param {string[]} args Additional diagnose command arguments
   * @returns {Plateform[]} platforms Platforms to diagnose
   * @returns {string} deviceName  Specific device or undefined for all devices
   */
  parseArgs(args: { [name: string]: any }) {
    const { platform: platformName, cmd: cmdName } = args

    const platform = filteredPlatforms.find(x => x.name === platformName)!
    const device = platform.devices.find(x => x.execute?.find(y => y.name === cmdName))

    if (!device) {
      throw new Error('cmd is not valid for this platform')
    }

    const executeConfig = device.execute!.find(x => x.name === cmdName)!

    return { platform, device, executeConfig }
  }

  async run() {
    const { args } = this.parse(Execute)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { platform, device, executeConfig } = this.parseArgs(args) // Device is needed for eval function

    const platformName = platform.name.replace(actionExpression, (_, group1) => eval(group1))
    const name = executeConfig.name.replace(actionExpression, (_, group1) => eval(group1))
    const cmd = executeConfig.cmd.replace(actionExpression, (_, group1) => eval(group1))

    console.log(`Starting cmd ${name} on ${platformName}`)

    try {
      execSync(cmd, { stdio: 'inherit' })
    } catch (error) {
      // No need to print error message
    }
  }
}
