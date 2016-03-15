'use strict'

/**
 * Module dependencies
 */
const path = require('path')
const co = require('co')
const os = require('./os')
const pget = require('pget')
const home = require('user-home')
const extract = require('extract-zip')
const pify = require('pify')
const exists = require('path-exists')
const figures = require('figures')
const config = require('./config')
require('shelljs/global')

module.exports = co.wrap(function* (version) {
  try {
    // Create cache dir
    const cacheDir = path.join(home, '.nwjs')
    mkdir('-p', cacheDir)
    // check if has cached nwjs in this version
    if (exists.sync(`${cacheDir}/${version}`)) {
      return console.log(`A cached nwjs already located in ${cacheDir}/${version}`.red)
    }
    // Download the nwjs
    const realVersion = version.split('-sdk').shift()
    const fileName = version == realVersion ? `nwjs-v${realVersion}-${os.platform}-${os.arch}` : `nwjs-sdk-v${realVersion}-${os.platform}-${os.arch}`
    const ext = os.platform === 'linux' ? 'tar.gz' : 'zip'
    const url = `http://dl.nwjs.io/v${realVersion}/${fileName}.${ext}`
    yield pget(url, {dir: cacheDir, target: `${version}.${ext}`, verbose: true, proxy: process.env.HTTP_PROXY})
    // extract both zip and tarball
    const from = `${cacheDir}/${version}.${ext}`
    if (os.platform === 'linux') {
      exec(`tar -xzvf ${from} -C ${cacheDir}`, {silent: true})
    } else {
      yield pify(extract)(from, {dir: cacheDir})
    }
    mv(`${cacheDir}/${fileName}`, `${cacheDir}/${version}`)
    // remove zip
    rm(from)
    // update the current using version
    config.set('current', version)
    // print success info
    console.log(`${figures.tick} Version ${version} is installed and activated`.green)
  } catch (e) {
    console.log(`Failed to install ${figures.cross} Version ${version}`.red)
    console.log(e.stack)
  }
})
