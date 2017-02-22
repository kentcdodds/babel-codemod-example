module.exports = function(babel) {
  const { types: t } = babel
  // could just use https://www.npmjs.com/package/is-builtin-module
  const nodeModules = [
    'fs', 'path', 'child_process',
  ]

  return {
    name: 'node-esmodule', // not required
    visitor: {
      ImportDeclaration(path) {
        const specifiers = []
        let defaultSpecifier
        path.get('specifiers').forEach(specifier => {
          if (t.isImportSpecifier(specifier)) {
            specifiers.push(specifier)
          } else {
            defaultSpecifier = specifier
          }
        })
        const {node: {value: source}} = path.get('source')
        if (!specifiers.length || !nodeModules.includes(source)) {
          return
        }
        let memberObjectNameIdentifier
        if (defaultSpecifier) {
          memberObjectNameIdentifier = defaultSpecifier.node.local
        } else {
          memberObjectNameIdentifier = path.scope.generateUidIdentifier(source)
          path.node.specifiers.push(t.importDefaultSpecifier(memberObjectNameIdentifier))
        }
        specifiers.forEach(specifier => {
          const {node: {imported: {name}}} = specifier
          const {referencePaths} = specifier.scope.getBinding(name)
          referencePaths.forEach(refPath => {
            refPath.replaceWith(
              t.memberExpression(memberObjectNameIdentifier, t.identifier(name))
            )
          })
          specifier.remove()
        })
      }
    }
  }
}
