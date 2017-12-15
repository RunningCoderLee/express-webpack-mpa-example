const entry = require('./webpackConfig/entry')
const output = require('./webpackConfig/output')
const modules = require('./webpackConfig/module')
const plugins = require('./webpackConfig/plugins')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  bail: !isDev,

  devtool: isDev ? 'source-map' : false,

  entry,

  output,

  module: modules,

  plugins,

  resolve: {
    extensions: ['.js', '.json'],
  },

  externals: {
    jquery: 'jQuery',
    jQuery: 'jQuery',
    $: 'jQuery',
    'window.$': 'jQuery',
    'window.jquery': 'jQuery',
    'window.jQuery': 'jQuery',
  },
}

module.exports = config
