const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractCSS = new ExtractTextPlugin('css/[name].css');       // 将css从js分离出来

module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '../src'),
  entry: {
    index: './index.js',
    about: './js/about.js'
  },
  resolve: {
    extensions: ['.js', '.less', '.css', '.jpg', '.png', '.svg', '.woff2', '.gif']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[hash:5].js'
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
      use: extractCSS.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'less-loader']
      })
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
    extractCSS,

    new HtmlWebpackPlugin({
      // title: '主页',
      // favicon: path.resolve(__dirname,'favicon.ico'), // 生成的 html 文件设置 favicon
      filename: path.resolve(__dirname, '../dist/index.html'), 
      template: "index.html",
      chunks: ['index'],
      inlineSource: '.(js|css)$',
      minify: {
        collapseWhitespace: true                   // 去除所有空格
      }
    }),

    new HtmlWebpackPlugin({
      title: 'about',
      // favicon: path.resolve(__dirname,'favicon.ico'), // 生成的 html 文件设置 favicon
      filename: path.resolve(__dirname, '../dist/pages/about.html'),
      template: "./pages/about.html",
      chunks: ['about'],
      inlineSource: '.(js|css)$',
      minify: {
        collapseWhitespace: true                   // 去除所有空格
      }
    }),

    //设置每一次build之前先删除dist
    new CleanWebpackPlugin(
      ['dist/*'],　                                 //匹配删除的文件
      {
          root: path.resolve(__dirname, '..'),      //根目录
          verbose: true,        　　　　　　　　　　  //开启在控制台输出信息
          dry: false        　　　　　　　　　　      //启用删除文件
      }
   )
  ]
}
