'use strict'

const babel = require('babel-core')
const assert = require('assert')

const plugin = require('./plugin')

module.exports = options => {
  const filename = options.filename
  assert(typeof filename === 'string')
  const code = options.code
  assert(typeof code === 'string')
  const presets = options.presets || []
  const plugins = options.plugins || []
  const babelrc = false

  const dependencies = {
    relatives: [],
    modules: [],
  }

  let result

  try {
    // why can't I transform from AST?
    const _result = presets.length || plugins.length
      ? babel.transform(code, {
        presets,
        plugins,
        babelrc,
      })
      : { code }

    // double transform :(
    result = babel.transform(_result.code, {
      plugins: [
        plugin(dependencies)
      ],
      babelrc,
    })
  } catch (err) {
    /* eslint no-console: 0 */
    console.error(`Error transforming file: ${filename}`)
    throw err
  }

  return {
    dependencies,
    filename,
    code: result.code,
  }
}
