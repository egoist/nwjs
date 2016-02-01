'use strict'

/**
 * Module dependencies
 */
const Config = require('configstore')
const pkg = require('../package')

module.exports = new Config(pkg.name)
