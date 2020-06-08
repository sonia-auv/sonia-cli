sonia-cli
=========

SONIA AUV CLI Tools

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/sonia-cli.svg)](https://npmjs.org/package/sonia-cli)
[![Downloads/week](https://img.shields.io/npm/dw/sonia-cli.svg)](https://npmjs.org/package/sonia-cli)
[![License](https://img.shields.io/npm/l/sonia-cli.svg)](https://github.com/sonia-auv/sonia-cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g sonia-cli
$ sonia COMMAND
running command...
$ sonia (-v|--version|version)
sonia-cli/0.0.0 linux-x64 node-v12.18.0
$ sonia --help [COMMAND]
USAGE
  $ sonia COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`sonia hello [FILE]`](#sonia-hello-file)
* [`sonia help [COMMAND]`](#sonia-help-command)

## `sonia hello [FILE]`

describe the command here

```
USAGE
  $ sonia hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ sonia hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/sonia-auv/sonia-cli/blob/v0.0.0/src/commands/hello.ts)_

## `sonia help [COMMAND]`

display help for sonia

```
USAGE
  $ sonia help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.1.0/src/commands/help.ts)_
<!-- commandsstop -->
