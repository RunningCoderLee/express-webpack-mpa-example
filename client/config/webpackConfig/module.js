const paths = require('../../../helper/paths')

const modules = {
  rules: [
    {
      test: /\.js$/,
      include: paths.client.src,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: ['Chrome >= 62'],
                },
              }],
            ],
            babelrc: false,
          },
        },
      ],
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
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'less-loader',
        options: {
          strictMath: true,
          noIeCompat: true,
        },
      }],
    },


  ],

  /* Advanced module configuration (click to show) */
}

module.exports = modules
