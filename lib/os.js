'use strict'

/**
 * Module dependencies
 */
const os = require('os')

const arch = os.arch()
let platform = os.platform()
if (platform === 'darwin') {
  platform = 'osx'
} else if (platform === 'win32') {
  platform = 'win'
}

module.exports = {arch, platform}
