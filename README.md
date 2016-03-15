# nwjs [![version](https://img.shields.io/npm/v/nwjs.svg)](https://www.npmjs.com/package/nwjs) [![npm](https://img.shields.io/npm/dm/nwjs.svg)](https://www.npmjs.com/package/nwjs)

Inspired by [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt)

You can use `nwjs` as an nw.js version manager, and do things like `nw /your/app/path`

![preview](http://ooo.0o0.ooo/2016/02/01/56af0ee357dab.gif)

# Install

```bash
npm i -g nwjs
```
# Usage

```bash
# Install a version
$ nw install 0.12.3

# Install a SDK version
$ nw install 0.13.0-rc3-sdk

# Run nw in cwd or specific any directory
$ nw .

# Use another cached version
$ nw use 0.13.0-beta3

# Use SDK version
$ nw use 0.13.0-rc3-sdk

# List all local cached versions
$ nw ls

# Use a proxy
$ http_proxy=http://127.0.0.1:8787 nw install 0.13.0-beta5

# For fish shell users
$ env http_proxy=http://127.0.0.1:8787 nw install 0.13.0-beta5
```

For all available versions to install please use `nw ls-remote`

_Tested on Windows 7(32), Windows 10(32), Ubuntu 14.04(32), OSX El Capitan (64)._

## Help

```bash
$ nw -h

  Usage: nw [options] [command]


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
const spawn = require('child_process').spawn
// this returns the path to nwjs excutable
const nw = require('nwjs')

const child = spawn(nw)
```

## License

MIT &copy; [EGOIST](https://github.com/egoist)
