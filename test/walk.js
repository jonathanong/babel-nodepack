'use strict'

const assert = require('assert')
require('bluebird').config({
  warnings: false
})

const fixture = require('./_fixture')
const walk = require('../lib/walk')

describe('Walk', () => {
  before(() => {
    return require('../lib/cache').rimraf()
  })

  before(() => {
    return require('../lib/cache').mkdirp()
  })

  it('fixture: walk-filenames', () => {
    const options = fixture.setup('walk-filenames')

    return walk({
      filename: options.filename,
      hash: Math.random().toString(36).slice(2),
    }).then(results => {
      console.log(results)
    })
  })
})
