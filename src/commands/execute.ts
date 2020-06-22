import { Command, flags } from '@oclif/command'
import { Config } from '../helper/platformsConfig'
import { IPlatform } from '../models/config'
import { exception, error } from 'console'
import * as Listr from 'listr'
import { command } from 'execa'
import { execSync } from 'child_process'

const actionExpression = new RegExp("\\{\\{(.*?)\\}\\}", "g");

const replacement = () => {
  console.log(replacement.caller);
  return (_: string, group1: string) => eval(group1);
};

const FilteredPlatforms = Config.filter(x => x.devices.find(y => y.execute));

export default class Execute extends Command {
  static description = 'Execute a command to a remote device'

  static aliases = ["exec"];

  static examples = [
    `$ sonia execute auv7 ssh`,
    `$ sonia execute auv7 shutdown`,
    `$ sonia execute auv8 reboot`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'platform',
      options: FilteredPlatforms.map(x => x.name),
      required: true,
      description: "Platform to target"
    },
    {
      name: 'cmd',
      options: [...new Set(FilteredPlatforms.map(x => x.devices).flat(1).filter(x => x.execute).map(x => x.execute!).flat(1).map(x => x.name))],
      required: true,
      description: "Command to execute (must be contain in specified platform-device)"
    }
  ]

  /**
   * Parse args and return
   * @param args
   * @returns platforms   Platforms to diagnose
   * @returns deviceName  Specific device or undefined for all devices
   */
  parseArgs(args: { [name: string]: any; }) {
    const platforms: IPlatform[] = [];
    let deviceName: string | undefined;
    if (args.platform) {
      const platform = FilteredPlatforms.find(x => x.name == args.platform)!;
      platforms.push(platform)

      if (args.device) {
        const device = platform.devices.find(x => x.name === args.device && x.diagnose);

        if (!device) {
          throw "device is not valid for this platform";
        }

        deviceName = args.device;

      }

    } else {
      platforms.push(...FilteredPlatforms);
    }
    return { platforms, deviceName };
  }

  async run() {
    const { args: { platform, cmd }, flags } = this.parse(Execute);

    const cmd_string = "echo hello";

    execSync(cmd_string, { stdio: 'inherit' })
    // const toto = spawn(cmd_array.shift()!, cmd_array, { stdio: [process.stdin, process.stdout, process.stderr] });


  }


}
