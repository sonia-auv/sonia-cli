import { Command, flags } from '@oclif/command'
import { Config } from '../helper/platformsConfig'
import { IPlatform } from '../models/config'
import { exception } from 'console'


const execa = require('execa');
const Listr = require('listr');

const actionExpression = new RegExp("\\{\\{(.*?)\\}\\}", "g");

const replacement = () => {
  console.log(replacement.caller);
  return (_: string, group1: string) => eval(group1);
};

export default class Diagnose extends Command {
  static description = 'Diagnose the system, specific platform and/or device(s)'



  static examples = [
    `$ sonia diagnose`,
    `$ sonia diagnose dockbox`,
    `$ sonia diagnose auv7`,
    `$ sonia diagnose auv7 dvl`,
    `$ sonia diagnose auv8 computer`,
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  static args = [
    {
      name: 'platform',
      options: Config.map(x => x.name),
      description: "Platform to target. None = all"
    },
    {
      name: 'device',
      options: [...new Set(Config.map(x => x.devices).flat(1).map(x => x.name))],
      description: "Device to target (must be contain in specified platform). None = all"
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
      const platform = Config.find(x => x.name == args.platform)!;
      platforms.push(platform)

      if (args.device) {
        const device = platform.devices.find(x => x.name === args.device);

        if (!device) {
          throw "device is not valid for this platform";
        }

        deviceName = args.device;

      }

    } else {
      platforms.push(...Config);
    }
    return { platforms, deviceName };
  }

  plaform?: IPlatform;

  async run() {
    const { args, flags } = this.parse(Diagnose);

    const { platforms, deviceName } = this.parseArgs(args);

    console.log("Platform: ", platforms);
    console.log("Device: ", deviceName);

    platforms.forEach(platform => {

      this.plaform = platform;

      const devices = platform.devices.filter(x => deviceName === undefined || x.name === deviceName);

      devices.forEach(device => {

        const diagnose = device.diagnose;

        if (diagnose !== undefined) {

          const actions = diagnose.actions;

          const tasks = new Listr();

          actions.forEach(action => {
            const name = action.name.replace(actionExpression, (_, group1) => eval(group1));
            const cmd = action.cmd.replace(actionExpression, (_, group1) => eval(group1));
            const successMessage = action.successMessage.replace(actionExpression, (_, group1) => eval(group1));
            const errorMessage = action.errorMessage.replace(actionExpression, (_, group1) => eval(group1));

            console.log(cmd)

            tasks.add({
              title: name,
              task: () => execa.stddout(cmd).then(result => {
                if (result !== '') {
                  throw new Error(errorMessage);
                }
              })
            })


            console.log("Name:", name);
          })

        }

      });

    });

  }

  async catch(err: any) {
    console.error(`Error: ${err}`);
  }
}
