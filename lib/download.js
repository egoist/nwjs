module.exports = function(platform, version) {
  var url = 'http://dl.nwjs.io/v' + version +'/nwjs-v' + version + '-'+ platform +'.zip'
  console.log('Checking if ' + url.green + ' exists...')
}
