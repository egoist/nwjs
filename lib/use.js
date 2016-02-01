'use strict'

/**
 * Module dependencies
 */
const config = require('./config')

module.exports = function (version) {
  config.set('current', version)
  console.log(`You're using v${version} now!`.green)
}
