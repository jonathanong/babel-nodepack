'use strict'

const assert = require('assert')
const path = require('path')
const _ = require('lodash')
const fs = require('fs')

exports.assert = (options, result) => {
  if (options.expected) assert.equal(result.code.trim(), options.expected.trim())
  if (options.dependencies) {
    if (options.dependencies.relatives) {
      assert(!_.difference(options.dependencies.relatives, result.dependencies.relatives).length)
    }
    if (options.dependencies.modules) {
      assert(!_.difference(options.dependencies.modules, result.dependencies.modules).length)
    }
  }

  fs.writeFileSync(path.join(options.root, 'result.js'), result.code)
}

exports.setup = name => {
  const root = fixture(name)
  const filename = path.join(root, 'index.js')
  const options = {
    root,
    filename,
    code: fs.readFileSync(filename, 'utf8'),
    babel: {},
  }

  const babelOptions = path.join(root, 'babel.json')
  if (fs.existsSync(babelOptions)) options.babel = require(babelOptions)

  const deps = path.join(root, 'dependencies.json')
  if (fs.existsSync(deps)) options.dependencies = require(deps)

  const expected = path.join(root, 'expected.js')
  if (fs.existsSync(expected)) options.expected = fs.readFileSync(expected, 'utf8')

  options.babel.presets = options.babel.presets || []
  options.babel.plugins = options.babel.plugins || []

  return options
}

function fixture (name) {
  return path.join(__dirname, 'fixtures', name)
}
