'use strict'

/**
 * Module dependencies
 */
const home = require('user-home')
require('shelljs/global')

module.exports = function (version) {
  try {
    const dir = `${home}/.nwjs/${version}`
    rm('-r', dir)
  } catch (e) {
    console.log(e.stack)
  }
}
