'use strict'

/**
 * Module dependencies
 */
const path = require('path')
const co = require('co')
const os = require('./os')
const mkdirp = require('mkdirp')
const pget = require('pget')
const home = require('user-home')
const extract = require('extract-zip')
const mv = require('mv')
const pify = require('pify')
const exists = require('path-exists')
const config = require('./config')

module.exports = co.wrap(function* (version) {
  console.log(version)
  try {
    // Create cache dir
    const cacheDir = path.join(home, '.nwjs')
    mkdirp.sync(`${cacheDir}/.cache`)
    // check if has cached nwjs in this version
    if (exists.sync(`${cacheDir}/${version}`)) {
      return console.log(`A cached nwjs already located in ${cacheDir}/${version}`.red)
    }
    // Download the nwjs
    const fileName = `nwjs-v${version}-${os.platform}-${os.arch}`
    const url = `http://dl.nwjs.io/v${version}/${fileName}.zip`
    yield pget(url, {dir: cacheDir, target: `.cache/${version}.zip`, verbose: true, proxy: process.env.HTTP_PROXY})
    // extract zip
    yield pify(extract)(`${cacheDir}/.cache/${version}.zip`, {dir: `${cacheDir}`})
    // mv (rename to its version)
    yield pify(mv)(`${cacheDir}/${fileName}`, `${cacheDir}/${version}`)
    // update the current using version
    config.set('current', version)
  } catch (e) {
    console.log(e.stack)
  }
})
