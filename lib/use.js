'use strict'

/**
 * Module dependencies
 */
const path = require('path')
const home = require('user-home')
const exists = require('path-exists')
const config = require('./config')

module.exports = function (version) {
  config.set('current', version)
  const cached = path.join(home, '.nwjs', version)
  if (!exists.sync(cached)) {
    return console.log(`Run ${`nw install ${version}`.red} first`)
  }
  console.log(`You're using v${version} now!`.green)
}
