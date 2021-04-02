const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const packageJson = require('./package.json');
const libraryName = JSON.stringify(packageJson.name).replace(/"/g,"");
const libraryVersion = JSON.stringify(packageJson.version);
const host = '127.0.0.1';
const port = 3000;
const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

module.exports = {
  entry: path.join(__dirname, '/src/flotter.js'),
  mode,
  output: {
    path: path.join(__dirname, '/dist'),
    filename: isProduction ? libraryName + '.min.js' : libraryName + '.js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: "postcss-loader",
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src')],
    extensions: ['.js', '.css']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProduction ? libraryName + '.min.css' : libraryName + '.css',
      chunkFilename: '[id].css'
    }),
    new webpack.DefinePlugin({
      'VERSION': libraryVersion
    })
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, 'dist'),
      path.join(__dirname, 'example')
    ],
    compress: true,
    disableHostCheck: true,
    host,
    port
  }
};
