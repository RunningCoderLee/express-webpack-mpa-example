const paths = require('../../helper/paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'home': `${paths.clientPages}/home/index`,
    // 'users': '../pages/users/users.js'
  }, 

  output: {
    path: paths.clientDist,

    filename: "[name].bundle.[hash].js", 

    publicPath: "/dist/", 
  },

  module: {
    rules: [
      {
        test:/\.js$/,
        include: paths.client,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                ["env", {
                  "targets": {
                    "browsers": ["ie >= 7"]
                  }
                }]
              ]
            }
          }
        ]
      },

      { 
        test: /\.ejs$/,
        use: [
          {
            loader: "html-loader",
            options: {
              /* ... */
            }
          }
        ]
      },

      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader", 
          options: {
            strictMath: true,
            noIeCompat: true
          }
        }]
      }
    ]

    /* Advanced module configuration (click to show) */
  },

  context: __dirname, 
  
  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['home'],
      template: `${paths.clientPages}/home/templates/index.ejs`,
      filename: `${paths.serverViews}/home/home.ejs`,
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: `${paths.clientPages}/home/templates/list.ejs`,
      filename: `${paths.serverViews}/home/list.ejs`,
    }),
    // new HtmlWebpackPlugin({
    //   inject: false,
    //   chunks: ['users'],
    //   template: path.resolve(__dirname, './client/users/index.ejs'),
    //   filename: path.resolve(__dirname,'./views/users.ejs'),
    // })
  ],
}
