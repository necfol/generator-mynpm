const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2' //导出commonjs规范
  },
  externals: /^babel-runtime/,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'index.css',
    })
  ],
  devtool: 'source-map'
}
