'use strict'

const path = require('path')
const fs = require('fs')

const _subrequire = fs.readFileSync(path.join(__dirname, '_subrequire.js'), 'utf8')

module.exports = (results, options) => {
  if (!options) options = {}
  const root = options.root || process.cwd()

  let js = _subrequire

  for (const result of results) {
    result.name = path.relative(root, result.filename)
    const deps = result._deps = {}
    for (const key of Object.keys(result.deps)) {
      deps[key] = result.deps[key].name
    }
  }

  for (const result of results.slice(0, -1)) {
    js += `subrequire.register(${JSON.stringify(result.name)}, function (module, exports, subrequire) {\n${result.code}\n}, ${JSON.stringify(result._deps)});\n\n`
  }

  const last = results[results.length - 1]
  js += `subrequire.root = subrequire.subclass(${JSON.stringify(last._deps)});\n\n`

  js += `(function () {\n${last.code}\n})();`

  return js
}
