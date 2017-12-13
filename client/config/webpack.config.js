const entry = require('./webpackConfig/entry')
const output = require('./webpackConfig/output')
const modules = require('./webpackConfig/module')
const plugins = require('./webpackConfig/plugins')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  bail: !isDev,

  devtool: isDev ? 'cheap-module-eval-source-map' : false,

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
