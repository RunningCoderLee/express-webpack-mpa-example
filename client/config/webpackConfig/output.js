const paths = require('../../../helper/paths')

const isDev = process.env.NODE_ENV === 'development'

const output = {
  path: paths.client.dist,

  publicPath: '/dist/',
}

if (isDev) {
  output.filename = '[name].bundle.js'
} else {
  output.filename = '[name].bundle.[hash].js'
}

module.exports = output
