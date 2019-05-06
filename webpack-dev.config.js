const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

let config = {
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  entry: ['@babel/polyfill', path.resolve(__dirname, 'client/src/index.jsx')],
  output: {
    path: path.resolve(__dirname, 'client/public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  context: path.resolve(__dirname, 'client/src'),
  devServer: {
    open: true,
    hot: true,
    noInfo: true,
    contentBase: path.resolve(__dirname, 'client/public'),
    proxy: {
      '/api': 'http://[::1]:3000'
    },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader', options: { sourceMap: true } },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        loader: 'file-loader'
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'images'
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '!!html-loader!client/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = config