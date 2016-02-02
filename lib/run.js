'use strict'

/**
 * Module dependencies
 */
const path = require('path')
const home = require('user-home')
const co = require('co')
const exists = require('path-exists')
const spawn = require('child-process-promise').spawn
const config = require('./config')
const platform = require('./os').platform

module.exports = function (dir) {
  try {
    const version = config.get('current')

    let nw
    if (platform === 'osx') {
      nw = 'nwjs.app/Contents/MacOS/nwjs'
    } else if (platform === 'win') {
      nw = 'nw.exe'
    } else {
      nw = 'nw'
    }
    nw = path.join(home, '.nwjs', version, nw)

    if (!exists.sync(nw)) {
      return console.log(`Cached nwjs excutable v${version} not found, run ${`nw install ${version}`.cyan} first`)
    }

    console.log(`Using nw.js v${version}`)
    spawn(nw, [dir])
      .progress(childProcess => {
        childProcess.stdout.on('data', function (data) {
          process.stdout.write(data.toString())
        })
        childProcess.stderr.on('data', function (data) {
          process.stderr.write(data.toString())
        })
      })
      .then(function () {
        console.log('===================='.green)
        console.log('bye!'.green)
      })
  } catch (e) {
    console.log(e.stack)
  }
}
