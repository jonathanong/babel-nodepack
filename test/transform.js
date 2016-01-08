'use strict'

const assert = require('assert')

const transform = require('../lib/transform')
const fixture = require('./_fixture')

describe('Transform', () => {
  it('fixture: require', () => {
    test('require')
  })

  it('fixture: import', () => {
    const result = test('import')
    assert(~result.code.indexOf(`subrequire('./relative')`))
  })
})

function test (name) {
  const options = fixture.setup(name)

  const result = transform({
    filename: options.filename,
    code: options.code,
    presets: options.babel.presets,
    plugins: options.babel.plugins,
  })

  fixture.assert(options, result)

  return result
}
