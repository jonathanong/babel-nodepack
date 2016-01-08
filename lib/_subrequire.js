function subrequire (name) {
  return subrequire.root(name)
}

subrequire.modules = {};

// create a new `subrequire()` function for each module
subrequire.subclass = function (dependencies) {
  return function _subrequire (name) {
    var _module = subrequire.modules[dependencies[name]]
    if (!_module) throw new Error('Could not find dependency: ' + name)

    // not yet initialized
    if (typeof _module.definition === 'function') {
      var _exports = _module.exports = {}
      var fn = _module.definition
      var deps = _module.dependencies

      // delete to avoid circular loops
      delete _module.definition
      delete _module.dependencies

      fn(_module, _exports, subrequire.subclass(deps))
    }

    return _module.exports
  }
};

subrequire.register = function (name, definition, dependencies) {
  subrequire.modules[name] = {
    definition: definition,
    dependencies: dependencies,
  }
};
