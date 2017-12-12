const { readdirSync } = require('fs')
// const { join } = require('path')
const paths = require('../../..//helper/paths')

const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true'

// const isDirectory = source => lstatSync(source).isDirectory()

const folders = readdirSync(paths.client.pages)

const entry = {}

folders.forEach((folder) => {
  entry[folder] = [
    `${paths.client.pages}/${folder}/index`,
    hotMiddlewareScript,
    `bootstrap-loader/lib/bootstrap.loader?configFilePath=${paths.root}/.bootstraprc!bootstrap-loader/no-op.js`,
  ]
})


// const getDirectories = source => readdirSync(source)
//   .map(name => join(source, name))
//   .filter(isDirectory)

// const arr = getDirectories(paths.client.pages)


module.exports = entry
