'use strict'

const Promise = require('bluebird')
const crypto = require('crypto')
const assert = require('assert')
const path = require('path')
const fs = require('mz/fs')

const transform = require('./transform')
const cache = require('./cache')

module.exports = Promise.coroutine(function * (options) {
  const filename = options.filename
  const code =
  options.code = typeof options.code === 'string'
    ? options.code
    : (yield fs.readFile(filename, 'utf8'))
  assert(typeof options.hash, 'A hash is required for each transform')
  const hash = createHash(options.hash, filename, code)
  const cacheFilename = path.join(cache.CACHE_DIR, hash)

  try {
    const string = yield fs.readFile(cacheFilename)
    return JSON.parse(string)
  } catch (_) {
    // ignore
  }

  const result = transform(options)

  yield cache.mkdirp()
  yield fs.writeFile(cacheFilename, JSON.stringify(result))

  return result
})

function createHash (hash, filename, code) {
  return crypto.createHash('sha256')
    .update(hash)
    .update(':')
    .update(filename)
    .update(':')
    .update(code)
    .digest('hex')
    + '.js'
}
