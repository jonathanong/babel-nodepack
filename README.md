
# babel-nodepack

[![NPM version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![Dependency Status][david-image]][david-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

A bundler for node.js projects using [babel](http://babeljs.io/).
Compiles all your _local_ files into a single script.

## API

### nodepack(options).then(js => )

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
