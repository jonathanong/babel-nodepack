'use strict'

const rimraf = require('rimraf-then')
const mkdirp = require('mkdirp-then')
const path = require('path')

exports.CACHE_DIR = process.env.BABEL_NODEPACK_CACHE_DIR
  || path.resolve(__dirname, '../.cache')

exports.rimraf = () => {
  return rimraf(exports.CACHE_DIR)
}

exports.mkdirp = () => {
  return mkdirp(exports.CACHE_DIR)
}
