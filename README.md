# nwjs

Inspired by [electron-prebuilt](https://github.com/mafintosh/electron-prebuilt)

You can use `nwjs` as a nw.js version manager, and do things like `nwjs /your/app/path`

# Install

```bash
npm i -g nwjs --verbose
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

## License

MIT.
