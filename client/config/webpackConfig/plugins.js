const paths = require('../../../helper/paths')
const webpack = require('webpack')
const { readdirSync } = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const read = require('fs-readdir-recursive')
const ReloadPlugin = require('reload-html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'


const pagesFolderPath = paths.client.pages
const publicTemplatesFolderPath = paths.client.publicTemplates

const htmlWebpackPlugins = []

const foldersNameInPages = readdirSync(pagesFolderPath)
const publicTemplates = read(paths.client.publicTemplates)


if (foldersNameInPages.length === 0) {
  throw new Error('The pages folder doesn\'t have any subfolders!')
}

// create html webpack plugin for all template files in pages folder
foldersNameInPages.forEach((folder) => {
  const currentPageTemplateFolderPath = `${pagesFolderPath}/${folder}/templates`
  const templates = readdirSync(currentPageTemplateFolderPath)

  if (!(templates.length === 0)) {
    templates.forEach((template) => {
      const options = {
        alwaysWriteToDisk: true,
        template: `${currentPageTemplateFolderPath}/${template}`,
        filename: `${paths.server.views}/pages/${folder}/templates/${template}`,
      }

      // add chunks if template is index
      if (template === 'index.ejs') {
        options.chunks = [folder]
      } else {
        options.inject = false
      }

      htmlWebpackPlugins.push(new HtmlWebpackPlugin(options))
    })
  }
})

// create html webpack plugin for all template files in publicTemplates folder
publicTemplates.forEach((item) => {
  const options = {
    alwaysWriteToDisk: true,
    template: `${publicTemplatesFolderPath}/${item}`,
    filename: `${paths.server.views}/publicTemplates/${item}`,
    inject: false,
  }

  htmlWebpackPlugins.push(new HtmlWebpackPlugin(options))
})

const plugins = [
  ...htmlWebpackPlugins,
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackHarddiskPlugin(),
  new LodashModuleReplacementPlugin({
    /** Iteratee shorthands for _.property, _.matches, & _.matchesProperty. */
    shorthands: true,
    /** Support “clone” methods & cloning source objects. */
    cloning: true,
    /** Support “curry” methods. */
    currying: true,
    /** Caches for methods like _.cloneDeep, _.isEqual, & _.uniq. */
    caching: true,
    /** Support objects in “Collection” methods. */
    collections: true,
    /** Support objects like buffers, maps, sets, symbols, typed arrays, etc. */
    exotics: true,
    /** Guards for host objects, sparse arrays, & other edge cases. */
    guards: true,
    /** Metadata to reduce wrapping of bound, curried, & partially applied functions.
     (requires currying) */
    metadata: true,
    /** Support deburring letters. */
    deburring: true,
    /** Support Unicode symbols. */
    unicode: true,
    /** Components to support chain sequences. */
    chaining: true,
    /** Support _.memoize & memoization. */
    memoizing: true,
    /** Support for coercing values to integers, numbers, & strings. */
    coercions: true,
    /** Support “flatten” methods & flattening rest arguments. */
    flattening: true,
    /** Deep property path support for methods like _.get, _.has, & _.set. */
    paths: true,
    /** Argument placeholder support for “bind”, “curry”, & “partial” methods.
     (requires currying) */
    placeholders: true,
  }),
]

if (isDev) {
  // TODO: 添加此插件会导致hot reload不可用，如更改颜色值会reload页面而不是只更改颜色
  // 不添加此插件，更改ejs模板文件后nodemon不会重启server
  plugins.push(new ReloadPlugin())
}

module.exports = plugins
