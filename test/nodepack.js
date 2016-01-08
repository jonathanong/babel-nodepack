'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs')

const fixture = require('./_fixture')
const nodepack = require('..')

describe('Node Pack', () => {
  describe('fixture: import-and-return', () => {
    const root = fixture.resolve('import-and-return')
    const hash = Math.random().toString(36).slice(2)

    it('should bundle it', () => {
      return nodepack({
        root,
        filename: root,
        hash,
        presets: ['es2015'],
      }).then(code => {
        new Function(code)
        fs.writeFileSync(path.join(root, 'result.js'), code)
      })
    })

    it('should return the package.json', () => {
      const data = require('./fixtures/import-and-return/result.js').default
      assert.equal(data.name, 'babel-nodepack')
    })
  })
})
