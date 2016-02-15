'use strict'

/**
 * Module dependencies
 */
const co = require('co')
const getVersions = require('nwjs-versions')
const Spin = require('io-spin')
const config = require('./config')

const spin = new Spin()

module.exports = co.wrap(function* () {
  try {
    spin.start()
    const current = config.get('current')
    let versions = yield getVersions()
    versions = versions
      .map(v => v === current ? `* ${v}`.green : `  ${v}`)
      .join('\n')
    spin.stop()
    console.log(versions)
  } catch (e) {
    spin.stop()
    console.log(e.stack)
  }
})
