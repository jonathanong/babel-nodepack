'use strict'

const bundle = require('./bundle')
const walk = require('./walk')

module.exports = options => {
  return walk(options).then(results => bundle(results, options))
}

module.exports.cache = require('./cache')
