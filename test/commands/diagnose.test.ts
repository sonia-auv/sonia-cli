import { expect, test } from '@oclif/test'

describe('commands:diagnose', () => {
  test
    .stdout()
    .command(['diagnose'])
    .it('Runs sonia diagnose', ctx => {
      expect(ctx.stdout).to.contain('dockbox')
      expect(ctx.stdout).to.contain('auv7')
      expect(ctx.stdout).to.contain('auv8')
    })
})
