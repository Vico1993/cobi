# cobi

Cobi is a CLI that help myself to track + analyse my cryto investment.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/cobi.svg)](https://npmjs.org/package/cobi)
[![Downloads/week](https://img.shields.io/npm/dw/cobi.svg)](https://npmjs.org/package/cobi)
[![License](https://img.shields.io/npm/l/cobi.svg)](https://github.com/Vico1993/cobi/blob/master/package.json)

<!-- toc -->

-   [Usage](#usage)
-   [Commands](#commands)
<!-- tocstop -->

# Usage

<!-- usage -->

```sh-session
$ npm install -g cobi
$ cobi COMMAND
running command...
$ cobi (-v|--version|version)
cobi/0.0.1 darwin-x64 node-v14.16.1
$ cobi --help [COMMAND]
USAGE
  $ cobi COMMAND
...
```

<!-- usagestop -->

# Commands

<!-- commands -->

-   [`cobi load`](#cobi-load)

## `oclif load`

Cobi will load some transactions

```
USAGE
  $ cobi load

OPTIONS
  --cryptoDotCom  Load transaction from crypto.com website. Will require export CSV.
```

_See code: [src/commands/load.ts](https://github.com/vico1993/cobi/src/commands/load.ts)_

<!-- commandsstop -->

TODO:

-   Make proper README.md
-   Deploy command to NPM with github action
-   Work on the logic, from CSV to JSON
    -   Implement date filter to not parse everything OVER and OVER
    -   Tag transaction by service ?
