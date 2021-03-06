const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './app/javascripts/app.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.js'
  },
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([
      { from: './app/index.html', to: "index.html" }
    ]),
    new CopyWebpackPlugin([
      { from: './app/voting.html', to: "voting.html" }
    ]),
    new CopyWebpackPlugin([
      { from: './app/logincallback.html', to: "logincallback.html" }
    ]),
    new CopyWebpackPlugin([
      { from: './app/board.html', to: "board.html" }
    ])
  ],
  devServer: { 
    contentBase: path.resolve(__dirname, './src'), 
    disableHostCheck: true, 
    host: "0.0.0.0"
  },
  module: {
    rules: [
      {
       test: /\.css$/,
       use: [ 'style-loader', 'css-loader' ]
      }
    ],
    loaders: [
      { test: /\.json$/, use: 'json-loader' },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  }
}
