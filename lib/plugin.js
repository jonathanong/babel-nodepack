'use strict'

module.exports = dependencies => {
  return () => {
    return {
      visitor: {
        CallExpression: {
          exit (path) {
            const node = path.node
            if (node.callee.name !== 'require') return
            const args = node.arguments
            // why would a require statement have more than one argument?
            if (args.length !== 1) return
            const arg = args[0]
            // don't know how to handle this
            if (arg.type !== 'StringLiteral') return

            const value = arg.value
            if (value[0] === '.') {
              node.callee.name = 'subrequire'
              dependencies.relatives.push(value)
            } else {
              dependencies.modules.push(value)
            }
          }
        }
      }
    }
  }
}
