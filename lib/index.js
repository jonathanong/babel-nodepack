'use strict'

const bundle = require('./bundle')
const walk = require('./walk')

module.exports = options => {
  return walk(options).then(tree => {
    return {
      tree,
      code: bundle(tree, options),
    }
  })
}

module.exports.cache = require('./cache')
