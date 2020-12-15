const path = require('path')
const ESLintPlugin = require('eslint-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: './assets/css/styles.css'
  // allChunks: true
})

const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: resolve('../src/html/'),
      to: resolve('../dist/')
    }
  ]
})

const esLintPlugin = new ESLintPlugin({
  emitWarning: true,
  emitError: true,
  failOnWarning: false,
  failOnError: false
})

const getEntries = () => {
  return [
    './src/js/index.js',
    './src/scss/index.scss'
  ]
}

module.exports = {
  mode: 'production',
  entry: getEntries(),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: './assets/js/bundle.js'
  },
  externals: {
    bootstrap: 'bootstrap'
  },
  plugins: [
    esLintPlugin,
    miniCssExtractPlugin,
    copyWebpackPlugin
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@': resolve('../src')
    }
  }
}
