const paths = require('../../../helper/paths')
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'

let cssModuleUse
let lessModuleUse
let sassModuleUse

if (isDev) {
  cssModuleUse = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: {
        sourceMap: true,
        importLoaders: 1,
      },
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
        plugins: () => [
          require('postcss-flexbugs-fixes'),  // eslint-disable-line
          autoprefixer({
            flexbox: 'no-2009',
          }),
        ],
      },
    },
  ]


  lessModuleUse = [{
    loader: 'style-loader',
  }, {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      importLoaders: 1,
    },
  }, {
    loader: 'less-loader',
    options: {
      strictMath: true,
      noIeCompat: true,
    },
  }]

  sassModuleUse = [
    'style-loader',
    {
      loader: 'css-loader', // translates CSS into CommonJS
      options: {
        sourceMap: true,
        importLoaders: 3,
      },
    },
    'resolve-url-loader', // resolves relative paths in url() statements based on the original source file
    {
      loader: 'postcss-loader',
      options: {
        ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
        sourceMap: true,
        plugins: () => [
          require('postcss-flexbugs-fixes'),  // eslint-disable-line
          autoprefixer({
            flexbox: 'no-2009',
          }),
        ],
      },
    },

    {
      loader: 'sass-loader', // compiles Sass to CSS,
      options: {
        sourceMap: true,
        // includePaths: [`${paths.appNodeModules}/normalize-scss/sass`],
      },
    },
  ]
} else {
  cssModuleUse = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      },

      {
        loader: require.resolve('postcss-loader'),
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            require('postcss-flexbugs-fixes'),  // eslint-disable-line
            autoprefixer({
              flexbox: 'no-2009',
            }),
          ],
        },
      },
    ],
  })

  lessModuleUse = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: [
      {
        loader: 'css-loader',
        options: {
          minimize: true,
        },
      },
      {
        loader: 'less-loader',
      },
    ],
  })

  sassModuleUse = ExtractTextPlugin.extract({
    fallback: require.resolve('style-loader'),
    use: [
      {
        loader: require.resolve('css-loader'), // translates CSS into CommonJS
        options: {
          minimize: true,
          importLoaders: 3,
        },
      },
      require.resolve('resolve-url-loader'), // resolves relative paths in url() statements based on the original source file
      {
        loader: require.resolve('postcss-loader'),
        options: {
          ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
          plugins: () => [
            require('postcss-flexbugs-fixes'),  // eslint-disable-line
            autoprefixer({
              flexbox: 'no-2009',
            }),
          ],
        },
      },

      {
        loader: require.resolve('sass-loader'), // compiles Sass to CSS,
      },
    ],
  })
}


const modules = {
  rules: [
    {
      test: /\.js$/,
      enforce: 'pre',
      include: paths.client.pages,
      use: [{
        loader: 'eslint-loader',
        options: {
          eslintPath: require.resolve('eslint'),
        },
      }],
    },
    {
      oneOf: [
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve('url-loader'),
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },

        {
          test: /\.ejs$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                /* ... */
              },
            },
          ],
        },

        {
          test: /\.js$/,
          include: paths.client.src,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  ['env', {
                    modules: false,
                    targets: {
                      browsers: ['Chrome >= 62'],
                    },
                  }],
                ],
                plugins: [
                  'lodash',
                ],
                babelrc: false,
              },
            },
          ],
        },

        {
          test: /\.css$/,
          use: cssModuleUse,
        },

        {
          test: /\.less$/,
          use: lessModuleUse,
        },

        {
          test: /\.scss$/,
          use: sassModuleUse,
        },

        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
          // loader: "url?limit=10000"
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: '[name].[hash:8].[ext]',
            },
          }],
        },

        {
          test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
          use: 'file-loader',
        },

        {
          test: /font-awesome\.config\.js/,
          use: [
            { loader: 'style-loader' },
            { loader: 'font-awesome-loader' },
          ],
        },

        {
          // Exclude `js` files to keep "css" loader working as it injects
          // it's runtime that would otherwise processed through "file" loader.
          // Also exclude `html` and `json` extensions so they get processed
          // by webpacks internal loaders.
          exclude: [/\.js$/, /\.html$/, /\.json$/],
          loader: 'file-loader',
          options: {
            name: 'static/media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
  ],

  /* Advanced module configuration (click to show) */
}

module.exports = modules
