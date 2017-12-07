const { readdirSync } = require('fs')
// const { join } = require('path')
const paths = require('../../helper/paths')

// const isDirectory = source => lstatSync(source).isDirectory()

const folders = readdirSync(paths.client.pages)

const entry = {}

folders.forEach((folder) => {
  entry[folder] = [`${paths.client.pages}/${folder}/index`]
})


// const getDirectories = source => readdirSync(source)
//   .map(name => join(source, name))
//   .filter(isDirectory)

// const arr = getDirectories(paths.client.pages)


module.exports = entry
