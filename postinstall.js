const path = require('path')
const mkdirp = require('mkdirp')
const home = require('user-home')

const cacheDir = path.join(home, '.nwjs', '.cache')
mkdirp.sync(cacheDir)
