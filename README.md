
# babel-nodepack

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

A bundler for node.js projects using [babel](http://babeljs.io/).
Compiles all your _local_ files into a single script suitable for node.js usage.
This differs from webpack/browserify in that:

- It's much simpler
- Only uses babel
- Does not parse `node_modules` - it assumes modules will still be available
- Only supports CommonJS build outputs

## Features

- Automatically caches builds to the local file system.

## Caveats

- `__dirname` and `__filename` are not supported
- Dynamic requires like `require('./' + 'file')` are not supported

## API

### nodepack(options).then(result => )

Returns:

- `result.tree` - the dependency tree as an array
- `result.code` - the JS code bundled together

Options:

- `filename` - entry file
- `hash` - hash for the entire build for testing.
  This should primarily be based on babel configs.
- `presets` - an array of babel presets to use.
- `plugins` - an array of babel plugins to use.

### nodepack.cache.CACHE_DIR

The location of the cache directory.
You could also set it via `BABEL_NODEPACK_CACHE_DIR=`.

### nodepack.cache.rimraf().then(() => )

Clear the nodepack cache folder.

### nodepack.cache.mkdirp().then(() => )

Make sure the nodepack cache folder exists.

[npm-image]: https://img.shields.io/npm/v/babel-nodepack.svg?style=flat-square
[npm-url]: https://npmjs.org/package/babel-nodepack
[travis-image]: https://img.shields.io/travis/jonathanong/babel-nodepack.svg?style=flat-square
[travis-url]: https://travis-ci.org/jonathanong/babel-nodepack
[codecov-image]: https://img.shields.io/codecov/c/github/jonathanong/babel-nodepack/master.svg?style=flat-square
[codecov-url]: https://codecov.io/github/jonathanong/babel-nodepack
[david-image]: http://img.shields.io/david/jonathanong/babel-nodepack.svg?style=flat-square
[david-url]: https://david-dm.org/jonathanong/babel-nodepack
[license-image]: http://img.shields.io/npm/l/babel-nodepack.svg?style=flat-square
[license-url]: LICENSE
[downloads-image]: http://img.shields.io/npm/dm/babel-nodepack.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/babel-nodepack
