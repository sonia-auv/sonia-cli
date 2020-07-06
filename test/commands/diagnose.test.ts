import {expect, test} from '@oclif/test'

describe('diagnose', () => {
  test
  .stdout()
  .command(['diagnose'])
  .it('Runs diagnose', ctx => {
    expect(ctx.stdout).to.contain('')
  })
})
