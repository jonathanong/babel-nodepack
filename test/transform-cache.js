'use strict'

// const assert = require('assert')

const transform = require('../lib/transform-cache')
const fixture = require('./_fixture')

before(() => {
  return require('../lib/cache').rimraf()
})

describe('Transform Cache', () => {
  describe('fixture: require', () => {
    const hash = Math.random().toString(36).slice(2)

    it('should transform it', () => {
      return test('require', hash)
    })

    it('should transform from cache', () => {
      return test('require', hash)
    })
  })
})

function test (name, hash) {
  const options = fixture.setup(name)

  return transform({
    hash,
    filename: options.filename,
    code: options.code,
    presets: options.babel.presets,
    plugins: options.babel.plugins,
  }).then(result => {
    fixture.assert(options, result)

    return result
  })
}
