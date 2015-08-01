var fs = require('fs')
var path = require('path')
var download = require('./download')

module.exports = function(opts, config) {
    config.useVersion = opts.version
    var configFile = path.resolve(__dirname + '/../config.json')
    fs.writeFileSync(configFile, JSON.stringify(config), {encoding: 'utf-8'})
    download(opts, function(err, files) {
      if(err) return console.error(err)
      console.log('Done installing, it is all good to test your app now!'.green)
    })
}
