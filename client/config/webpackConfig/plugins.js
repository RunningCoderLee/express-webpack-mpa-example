const paths = require('../../../helper/paths')
const webpack = require('webpack')
const { readdirSync } = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
const read = require('fs-readdir-recursive')
const ReloadPlugin = require('reload-html-webpack-plugin')

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
]

if (isDev) {
  // TODO: 添加此插件会导致hot reload不可用，如更改颜色值会reload页面而不是只更改颜色
  // 不添加此插件，更改ejs模板文件后nodemon不会重启server
  plugins.push(new ReloadPlugin())
}

module.exports = plugins
