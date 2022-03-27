# tnwjs [![version](https://img.shields.io/npm/v/tnwjs.svg)](https://www.npmjs.com/package/tnwjs) [![npm](https://img.shields.io/npm/dm/tnwjs.svg)](https://www.npmjs.com/package/tnwjs)

> forked from <https://github.com/egoist/nwjs>. fixed some errors

Inspired by [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt)

You can use `tnwjs` as an nw.js version manager, and do things like `tnw /your/app/path`

![preview](http://ooo.0o0.ooo/2016/02/01/56af0ee357dab.gif)

## Install

```bash
npm i -g tnwjs
```

## Usage

```bash
# Install a version
$ tnw install 0.12.3

# Install a SDK version
$ tnw install 0.13.0-rc3-sdk

# Run tnw in cwd or specific any directory
$ tnw .

# Use another cached version
$ tnw use 0.13.0-beta3

# Use SDK version
$ tnw use 0.13.0-rc3-sdk

# Show the nw version currently in use
$ tnw current

# List all local cached versions
$ tnw ls

# Use a proxy
$ http_proxy=http://127.0.0.1:8787 tnw install 0.13.0-beta5

# For fish shell users
$ env http_proxy=http://127.0.0.1:8787 tnw install 0.13.0-beta5
```

For all available versions to install please use `tnw ls-remote`

_Tested on Windows 7(32), Windows 10(32), Ubuntu 14.04(32), OSX El Capitan (64)._

## Help

```bash
$ tnw -h

  Usage: tnw [options] [command]


  Commands:

    *                       Run nwjs in a directory
    install|i <version>     Install an nwjs version
    use|u <version>         Set an active nwjs version
    list|ls                 List local cached nwjs versions
    list-remote|ls-remote   List all available nwjs versions from remote
    remove|r <version>      Remove a specific version of nwjs

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## Programmatic usage

```js
const spawn = require("child_process").spawn;
// this returns the path to nwjs excutable
const nw = require("tnwjs");

const child = spawn(nw);
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
