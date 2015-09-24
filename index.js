var fs = require('fs');
var os = require('os');
var path = require('path');
var homePath = require('user-home');
var spawn = require('child-process-promise').spawn;
var download = require('./lib/download');
var config = require('./config');
var version = config.useVersion;


// get platform due to nw.js's bad naming style
var platform = os.platform();
var system;
if (platform.substring(0, 5) == 'linux') {
  system = 'linux';
} else if (platform.substring(0, 5) == 'win32') {
  system = 'win';
} else if (platform.substring(0, 6) == 'darwin') {
  system = 'osx';
}

platform = system + '-' + os.arch();


module.exports = function (argv) {
  // usage: nwjs or nwjs . or nwjs C:\Users\sox\Dropbox\dev\app
  var opts = {
    platform: platform,
    version: version
  };
  
  switch (argv[0]) {
  case 'use':
    opts.version = argv[1] || version;
    require('./lib/install')(opts, config);
    break;
  case 'info':
    var info = 'Currently using nw.js ' + version + ' to run you apps';
    console.log(info.green);
    break;
  default:
    prebuilt();
  }
  
  function prebuilt() {
    var nwjsArgs;
    var infoStart, infoStop;
    
    if (argv.length) {
      nwjsArgs = argv;
      infoStart = 'Running nwjs prebuilts with arguments: "' + nwjsArgs.join(' ') + '"';
      infoStop = 'Stopped running app with arguments "' + nwjsArgs.join(' ') + '" in nw.js ' + version;
    } else {
      nwjsArgs = ['.'];
      infoStart = 'Running nwjs prebuilts in .';
      infoStop = 'Stopped running app . in nw.js ' + version;
    }
    
    download(opts, function (err, files) {
      console.log(infoStart.cyan);
      console.log('===================='.green);
      
      if (err)
        return console.log(err);
        
      var exe = system == 'osx' ? '/nwjs.app/Contents/MacOS/nwjs' : '/nw';
      var nwjs = path.join(homePath, '.nwjs/' + version + exe);
      
      spawn(nwjs, nwjsArgs)
        .progress(function (childProcess) {
          // redirect nw.js stdout
          childProcess.stdout.on('data', function (data) {
            process.stdout.write(data.toString());
          });
          childProcess.stderr.on('data', function (data) {
            process.stderr.write(data.toString());
          });
        }).then(function () {
          console.log(infoStop.red);
          console.log('===================='.green);
        });
        
    });
  }
};
