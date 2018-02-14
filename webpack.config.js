var path = require('path');
var childProcess = require('child_process');
var autoprefixer = require('autoprefixer');
var postcssImport = require('postcss-import');
var webpack = require('webpack');

// Add HMR for development environments only.
var entry = ['./src/index.js'];
if (process.env.NODE_ENV === 'dev') {
  entry = [
    'webpack-dev-server/client?http://localhost:3333'
    // 'webpack/hot/only-dev-server'
  ].concat(entry);
}

// Minification.
var plugins = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  }),
];
if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }));
}

// dist/
var filename = 'input.js';
var outPath = 'dist';
if (process.env.AFRAME_DIST) {
  outPath = 'dist';
  if (process.env.NODE_ENV === 'production') {
    filename = 'input.min.js';
  }
}

module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 3333
  },
  entry: entry,
  output: {
    path: path.join(__dirname, outPath),
    filename: filename,
    publicPath: '/dist/',
    libraryTarget: 'umd',
    library: 'INPUT'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          plugins: ['transform-class-properties']
        }
      }
    ]
  },
  plugins: plugins,
};
