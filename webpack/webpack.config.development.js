const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const port = 7000;

module.exports = {
  mode: 'development',
  context: path.resolve(__dirname, '../src'),
  entry: {
    index: './index.js'
  },
  resolve: {
    extensions: ['.js', '.less', '.css', '.jpg', '.png', '.svg', '.woff2', '.gif']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    filename: '[name]-[hash:5].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader'
      }]
    }, {
      test: /\.(less|css)$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          sourceMap: true
        }
      }, {
        loader: 'less-loader',
        options: {
          sourceMap: true
        }
      }]
    }, {
      test: /\.(jpg|jpeg|png|svg|gif|woff2)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/[hash].[ext]'
        }
      }]
    }, {
      test: /\.html$/,
      use: {
          loader: 'html-loader'
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: '../dist/index.html',
      inject: 'head',
      template: "index.html",
      chunks: ['index'],
      inlineSource: '.(js|css)$'
    }),
    // 开启webpack全局热更新
    new webpack.HotModuleReplacementPlugin(),

    // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
    new webpack.NamedModulesPlugin()
  ],
  devServer: {
    port,
    contentBase: path.resolve(__dirname, '../dist'),
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://localhost:8300'
      }
    },
    overlay: true,
    stats: {
      assets: false,
      chunks: false,
      timings: true,
      version: false
    }
  }
}
