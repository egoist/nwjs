# nwjs

Inspired by [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt)

You can use `nwjs` as a nw.js version manager, and do things like `nwjs /your/app/path`

![preview](http://ww4.sinaimg.cn/large/a15b4afegw1eun3wckiwwg20v70i4x5c.gif)

# Install

```bash
npm i -g nwjs
```

# Usage

```bash
# log the version of nw.js you use to run your app
nwjs info

# install some version of nw.js
nwjs use 0.12.3 or nwjs use 0.13.0-alpha2
# and so on...

# run app
# suppose the the app directory contains 'package.json' and the entry html file
nwjs
nwjs ./app
```

_Have to note that I have only tested it on win32 platform, use at your own risk and PRs are welcome._

## License

MIT.
