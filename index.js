var fs = require('fs')
var os = require('os')
var path = require('path')
var homePath = require('home-path')
var spawn = require('child-process-promise').spawn
var download = require('./lib/download')
var config = require('./config')
var version = config.useVersion

// get platform due to nw.js's bad naming style
var platform = os.platform()
var system
if(platform.substring(0, 5) == 'linux') {
  system = 'linux'
} else if (platform.substring(0, 5) == 'win32') {
  system = 'win'
} else if (platform.substring(0, 6) == 'darwin') {
  system = 'osx'
}
platform = system  + '-' + os.arch()

module.exports = function(argv) {
  // usage: nwjs or nwjs . or nwjs C:\Users\sox\Dropbox\dev\app
  var opts = {
    platform: platform,
    version: version
  }

  switch (argv._[0]) {
    case 'use':
      opts.version = argv._[1] || version
      require('./lib/install')(opts, config)
      break
    case 'info':
      var info = 'Currently using nw.js ' + version + ' to run you apps'
      console.log(info.green)
      break
    default:
      prebuilt()
  }

  function prebuilt() {
    var appPath = argv._[0] ? argv._[0] : '.'
    console.log('Running nwjs prebuilts in '.cyan + appPath.cyan)

    download(opts, mainAction)


    function mainAction(err, files) {
      if(err) return console.log(err)
      var exe = system == 'osx' ? '/nwjs.app/Contents/Resources/app.nw' : '/nw'
      var nwjs = path.join(homePath(), '.nwjs/' + version + exe)
      spawn(nwjs, [appPath])
        .then(function() {
          var info = 'Stopped running app ' + appPath + ' in nw.js ' + version
          console.log(info.red)
        })
    }

  }
}
