'use strict'

/**
 * Module dependencies
 */
const os = require('os')

let arch = os.arch()
let platform = os.platform()

// there are no official arm64 builds so
// use x64 ones on Apple Silicon macs
if (arch === 'arm64' && platform === 'darwin') {
  arch = 'x64'
}

if (platform === 'darwin') {
  platform = 'osx'
} else if (platform === 'win32') {
  platform = 'win'
}

module.exports = {arch, platform}
