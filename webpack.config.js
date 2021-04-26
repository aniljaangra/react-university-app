const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const htmlPlugin = new HtmlWebpackPlugin({
  templateContent: `
    <html lang="en">
    <head>
    <title>React University App</title>
    </head>
      <body>
        <div id="root"></div>
      </body>
    </html>
  `,
});
module.exports = {
  devtool: 'eval-cheap-module-source-map',
  resolve: {
    extensions: ['.jsx', '.js', '.json'],
  },
  entry: resolve('./src/App/App.jsx'),
  output: {
    filename: 'bundle.js',
  },
  devServer: {
    hot: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
  plugins: [htmlPlugin],
};
