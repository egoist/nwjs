# nwjs

Inspired by [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt)

You can use `nwjs` as a nw.js version manager, and do things like `nw /your/app/path`

![preview](http://ww4.sinaimg.cn/large/a15b4afegw1eun3wckiwwg20v70i4x5c.gif)

# Install

```bash
npm i -g nwjs
```
# Usage

```bash
# Install a version
$ nw install 0.12.3

# Run nw in cwd or specific any directory
$ nw .

# Use another cached version
$ nw use 0.13.0-beta3

# List all local cached versions
$ nw ls

# Use a proxy
$ http_proxy=http://127.0.0.1:8787 nw install 0.13.0-beta5

# For fish shell users
$ env http_proxy=http://127.0.0.1:8787 nw install 0.13.0-beta5
```

For all available versions to install please visit http://dl.nwjs.io/

_Tested on Windows 7(32), Windows 10(32), Ubuntu 14.04(32), OSX El Capitan (64)._

## Help

```bash
$ nw -h

  Usage: nw [options] [command]


  Commands:

    *                    Run nwjs in a directory
    install|i <version>  Install an nwjs version
    use|u <version>      Set an active nwjs version
    list|ls              List local cached nwjs versions

  Options:

    -h, --help     output usage information
    -V, --version  output the version number
```

## License

MIT &copy; [EGOIST](https://github.com/egoist).
