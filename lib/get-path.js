'use strict'
const path = require('path')
const home = require('user-home')
const platform = require('./os').platform
const config = require('./config')
const oldVesrion = require('./old-version')

module.exports = function () {
    const version = config.get('current')
    const isNodeWebkit = oldVesrion(version)
    if (version) {
        let nw
        if (platform === 'osx') {
            nw = isNodeWebkit?'node-webkit.app/Contents/MacOS/node-webkit':'nwjs.app/Contents/MacOS/nwjs'
        } else if (platform === 'win') {
            nw = 'nw.exe'
        } else {
            nw = 'nw'
        }
        nw = path.join(home, '.nwjs', version, nw)
        
        return nw
    }
    
    return null
}