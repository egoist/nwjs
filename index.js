var fs = require('fs')
var os = require('os')
var download = require('./lib/download')
var version = '0.12.2'

// get platform due to nw.js's bad naming style
var platform = os.platform()
if(platform.substring(0, 5) == 'linux') {
  platform = 'linux'
} else if (platform.substring(0, 5) == 'win32') {
  platform = 'win'
} else if (platform.substring(0, 6) == 'darwin') {
  platform = 'osx'
}
platform = platform  + '-' + os.arch()

module.exports = function(argv) {
  console.log(argv)
  // usage: nwjs or nwjs . or nwjs C:\Users\sox\Dropbox\dev\app
  var appPath = argv._[0] ? argv._[0] : '.'
  console.log('Running nwjs prebuilts in '.cyan + appPath.cyan)

  download(platform, version)
}
