function subrequire (name) {
  return subrequire.root(name)
}

subrequire.modules = {};

// create a new `subrequire()` function for each module
subrequire.subclass = function (dependencies) {
  return function subrequire (name) {
    const _module = subrequire.modules[dependencies[name]]
    if (!_module) throw new Error('Could not find dependency: ' + name)

    // not yet initialized
    if (typeof _module.definition === 'function') {
      const _exports = _module.exports = {}
      const definition = _module.definition
      const dependencies = _module.dependencies

      // delete to avoid circular loops
      delete _module.definition
      delete _module.dependencies

      _module.definition(_module, _exports, subrequire.subclass(dependencies))
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
