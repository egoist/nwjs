'use strict'

/**
 * Module dependencies
 */
const path = require('path')
const home = require('user-home')
const exists = require('path-exists')
const spawn = require('child_process').spawn
const config = require('./config')
const getPath = require('./get-path')

module.exports = function (dir, opts) {
  try {
    const version = config.get('current')
    const nw = getPath()

    if (!exists.sync(nw)) {
      return console.log(`Cached nwjs excutable v${version} not found, run ${`nw install ${version}`.cyan} first`)
    }

    const cliArgs = opts.parent.rawArgs.slice(3)

    console.log(`Using nw.js v${version}`)

    const run = spawn(nw, [dir].concat(cliArgs))
    run.stdout.on('data', data => console.log(data.toString()))
    run.stderr.on('data', data => console.log(data.toString()))
    run.on('close', code => {
      process.exitCode = code
      console.log('===================='.green)
      console.log('bye!'.green)
    })
  } catch (e) {
    console.log(e.stack)
  }
}
