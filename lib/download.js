var pathExists = require('path-exists')
var mkdirp = require('mkdirp')
var path = require('path')
var homePath = require('home-path')
var Download = require('download')
var progress = require('download-status')

module.exports = function(opts, cb) {
  var platform = opts.platform
  var version = opts.version
  var extension = '.zip'
  if(platform == 'linux') extension = '.tar.gz'
  var filename = 'nwjs-v' + version + '-'+ platform
  if(version.indexOf('-') > 0) {
    version = version.split('-').join('/')
  }
  var url = 'http://dl.nwjs.io/v' + version +'/' + filename + extension


  var cacheDir = path.join(homePath(), '.nwjs')
  var nwjsDir = path.join(cacheDir, opts.version)
  var cacheZip = path.join(cacheDir, filename)

  console.log('Checking if ' + nwjsDir.green + ' exists...')
  if(pathExists.sync(nwjsDir)) {
    console.log(nwjsDir + ' exists, running from there...')
    cb(null)
  } else {
    console.log('to download...')
    // mkdir -p
    mkdirp(cacheDir, function (err) {
      if (err) return console.error(err)
      console.log('downloading nw.js...'.magenta)
      new Download({mode: '755', extract: true, strip: 1})
        .get(url)
        .use(progress())
        .dest(path.join(cacheDir, opts.version))
        .run(cb)
    })
  }
}
