import { Command, flags } from '@oclif/command'
import { execSync } from 'child_process'
const prompts = require('prompts')

export default class Authenticate extends Command {
  static description = 'Add authentication credentials to access GitHub and GitHub Packages'

  static examples = [
    '$ sonia authenticate ',
  ]

  static flags = {
    help: flags.help({ char: 'h' }),
  }

  async askDockerLoginToGithubPackages() {
    execSync('clear', { stdio: 'inherit' })
    const response = await prompts(
      {
        type: 'toggle',
        name: 'login',
        message: 'Do you want to login to GitHub Docker packages registry',
        initial: true,
        active: 'yes',
        inactive: 'no',
      },
    )

    if (response.login === true) {
      const questions = [
        {
          type: 'text',
          name: 'username',
          message: 'Enter your GitHub username',
        },
        {
          type: 'text',
          name: 'token',
          message: 'Enter GitHub personnel access token',
        },
      ]

      const response = await prompts(questions)
      this.dockerLoginToGithubPackages(response.username, response.token)
    }
  }

  async askCopySSHKeyToRemote() {
    const onSubmit = (_: any, answer: string[]) => this.copySSHKeyToRemote(answer)
    await prompts({
      type: 'multiselect',
      name: 'copy',
      message: 'Copy ssh-key to auvs',
      choices: [
        { title: 'auv7', value: 'auv7' },
        { title: 'auv8', value: 'auv8' },
      ],
      hint: '- Space to select. Return to submit',
    }, { onSubmit })
  }

  async askDisplaySSHKey() {
    const onSubmit = (_: any, answer: boolean) => this.displaySSHKey(answer)
    await prompts({
      type: 'toggle',
      name: 'sshKey',
      message: 'Do you want to display your ssh key (Add it to you GitHub profile)',
      initial: true,
      active: 'yes',
      inactive: 'no',
    }, { onSubmit })
  }

  async askCreateSSHKey() {
    const onSubmit = (_: any, answer: boolean) => this.createSSHKey(answer)
    await prompts({
      type: 'toggle',
      name: 'sshKey',
      message: 'Do you want to generate an an ssh key',
      initial: true,
      active: 'yes',
      inactive: 'no',
    }, { onSubmit })
  }

  createSSHKey(answer: boolean) {
    if (answer === true) {
      execSync(`ssh-keygen -t rsa -b 4096 -N '' -f ${this.config.home}/.ssh/id_rsa`, { stdio: 'inherit' })
      execSync('clear', { stdio: 'inherit' })
    }
  }

  displaySSHKey(answer: boolean) {
    if (answer === true) {
      execSync(`cat ${this.config.home}/.ssh/id_rsa.pub`, { stdio: 'inherit' })
    }
  }

  copySSHKeyToRemote(answers: string[]) {
    execSync('clear', { stdio: 'inherit' })
    answers.forEach((remote: string) => {
      if (remote === 'auv7') {
        try {
          execSync('ssh-copy-id sonia@192.168.0.11', { stdio: 'inherit', timeout: 5000 })
        } catch (error) {
          console.log('An error occured while copying ssh-key into auv7')
        }
      } else if (remote === 'auv8') {
        try {
          execSync('ssh-copy-id sonia@192.168.0.12', { stdio: 'inherit', timeout: 5000 })
        } catch (error) {
          console.log('An error occured while copying ssh-key into auv7')
        }
      }
    })
  }

  dockerLoginToGithubPackages(username: string, token: string) {
    execSync('clear', { stdio: 'inherit' })
    execSync(`echo "${token}" | docker login https://docker.pkg.github.com -u ${username} --password-stdin `, { stdio: 'inherit' })
  }

  async run() {
    await this.askCreateSSHKey()
    await this.askDisplaySSHKey()
    await this.askCopySSHKeyToRemote()
    await this.askDockerLoginToGithubPackages()
  }
}
