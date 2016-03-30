'use strict'

/**
 * Module dependencies
 */
const path = require('path')
const home = require('user-home')
const exists = require('path-exists')
const spawn = require('cross-spawn-async')
const tkill = require('tree-kill')
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
    run.on('exit', code => {
      process.exit(code)
    })

    process.on('exit', () => {
      console.log('===================='.green)
      console.log('bye!'.green)
    })
    process.on('SIGINT', end)
    process.on('SIGTERM', end)
    process.on('SIGQUIT', end)
    process.on('SIGHUP', end)
    process.on('SIGBREAK', end)

    function end() {
      tkill(run.pid, 'SIGINT')
    }
  } catch (e) {
    console.log(e.stack)
  }
}
