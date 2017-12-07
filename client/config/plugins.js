const paths = require('../../helper/paths')
const { readdirSync } = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const read = require('fs-readdir-recursive')


const pagesFolderPath = paths.client.pages
const publicTemplatesFolderPath = paths.client.publicTemplates

const htmlWebpackPlugins = []

const foldersNameInPages = readdirSync(pagesFolderPath)
const publicTemplates = read(paths.client.publicTemplates)

console.log(publicTemplates)


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

publicTemplates.forEach((item) => {
  const options = {
    template: `${publicTemplatesFolderPath}/${item}`,
    filename: `${paths.server.views}/publicTemplates/${item}`,
    inject: false,
  }

  console.log(options)

  htmlWebpackPlugins.push(new HtmlWebpackPlugin(options))
})

module.exports = [...htmlWebpackPlugins]
