const paths = require('../../../helper/paths')
const autoprefixer = require('autoprefixer')

const modules = {
  rules: [
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
          test: /\.less$/,
          use: [{
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
          }],
        },

        {
          test: /\.scss$/,
          use: [
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
                  // 'postcss-flexbugs-fixes',  // eslint-disable-line
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
          ],
        },

        {
          test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
          // loader: "url?limit=10000"
          use: 'url-loader',
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
