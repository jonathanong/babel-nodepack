'use strict'

// const assert = require('assert')

require('bluebird').config({
  warnings: false
})

const bundle = require('../lib/bundle')
const fixture = require('./_fixture')
const walk = require('../lib/walk')

describe('Walk', () => {
  it('fixture: walk-filenames', () => {
    const options = fixture.setup('walk-filenames')

    return walk({
      filename: options.filename,
      hash: Math.random().toString(36).slice(2),
    }).then(results => {
      const js = bundle(results)
      new Function(js)
    })
  })
})
