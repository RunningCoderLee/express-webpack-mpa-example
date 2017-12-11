const entry = require('./webpackConfig/entry')
const output = require('./webpackConfig/output')
const modules = require('./webpackConfig/module')
const plugins = require('./webpackConfig/plugins')


const config = {
  devtool: 'cheap-module-eval-source-map',

  entry,

  output,

  module: modules,

  plugins,

  externals: {
    jquery: 'jQuery',
    jQuery: 'jQuery',
    $: 'jQuery',
    'window.$': 'jQuery',
    'window.jquery': 'jQuery',
    'window.jQuery': 'jQuery',
  },
}

console.log('config = ', config)

module.exports = config
