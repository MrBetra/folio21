const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'development',

  entry: './src/js/app.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },

  resolve: {

    alias: {
      '@js': path.resolve(__dirname, 'src/js/'),
      '@scss': path.resolve(__dirname, 'src/style/'),
      '@images': path.resolve(__dirname, 'dist/images/'),
      '@fonts': path.resolve(__dirname, 'dist/fonts/')
    }

  },

  plugins: [

    new MiniCssExtractPlugin({
      filename: "app.css",
    })
  
  ],

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          // MiniCssExtractPlugin doit être placer apres 'style-loader'
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ]
      },
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: '/assets/fonts/',
              publicPath: '../fonts/',
              context: path.resolve(__dirname, './dist/assets/fonts/')
            }
          }
        ]
      }
    ],
  },


};