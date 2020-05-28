const path = require('path')

module.exports = {
  mode: 'production', // "development" (not minified)
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'), // default ./dist/
    filename: './assets/app.bundle.js', // default main.js
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties'],
        },

      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 5000,
  },
}
