const path = require('path')
const home = require('user-home')
require('shelljs/global')

const cacheDir = path.join(home, '.nwjs')
mkdir('-p', cacheDir)
