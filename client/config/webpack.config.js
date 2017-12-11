const entry = require('./webpackConfig/entry')
const output = require('./webpackConfig/output')
const modules = require('./webpackConfig/module')
const plugins = require('./webpackConfig/plugins')


const config = {
  entry,

  output,

  module: modules,

  plugins,
}

console.log('config = ', config)

module.exports = config
