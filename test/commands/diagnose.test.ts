import { expect, test } from '@oclif/test'

describe('diagnose', () => {
  test
  .stdout()
  .command(['diagnose'])
  .exit(1)
})
