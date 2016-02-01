'use strict'

/**
 * Module dependencies
 */
const fs = require('fs')
const pify = require('pify')
const co = require('co')
const home = require('user-home')
const isSemver = require('is-semver')
const config = require('./config')

module.exports = co.wrap(function* () {
  try {
    const current = config.get('current')
    let versions = yield pify(fs).readdir(`${home}/.nwjs`)
    versions = versions
      .filter(v => isSemver(v))
      .map(v => v === current ? `* ${v}`.green : `  ${v}`)
      .join('\n')
    console.log(versions)
  } catch (e) {
    console.log(e.stack)
  }
})
