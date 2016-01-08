'use strict'

const Promise = require('bluebird')
const assert = require('assert')
const path = require('path')
const fs = require('mz/fs')

const transform = require('./transform-cache')

module.exports = Promise.coroutine(function * (options) {
  assert(options.hash)
  assert(options.filename)

  const filename = yield* lookup(options.filename)
  const code = null

  const files = new Map()

  const results = []

  yield* walk(filename)

  return results

  function * walk (filename) {
    // already exists
    if (files.has(filename)) return files.get(filename)

    const result = yield transform(Object.assign({}, options, {
      filename,
      code,
    }))

    const deps = result.deps = {}

    for (const name of result.dependencies.relatives) {
      const nextFilename = yield* lookup(path.resolve(filename, '..', name))
      const file = yield* walk(nextFilename)
      deps[name] = file
    }

    files.set(filename, result)
    results.push(result)

    return result
  }
})

const extensions = [
  '/index.js',
  '.js',
  '',
]

function * lookup (filename) {
  const exts = extensions
  if (/\/$/.test(filename)) exts.push('index.js')

  for (const ext of exts) {
    try {
      const stats = yield fs.stat(filename + ext)
      if (!stats.isFile()) throw new Error(`Cannot read file: ${filename}`)
      return filename + ext
    } catch (_) {
      // ignore
    }
  }

  throw new Error(`Could resolve the file: ${filename}`)
}
