const {esbuildPlugin} = require('@web/dev-server-esbuild')

module.exports = {
  files: ['test/*'],
  nodeResolve: true,
  plugins: [esbuildPlugin({ts: true, target: 'es2020'})]
}