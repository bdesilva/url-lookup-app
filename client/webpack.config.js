var path = require('path'),
  webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'src/static/js'),
  public: path.join(__dirname, 'public')
};

module.exports = {
  cache: true,
  debug: true,
  devtool: 'eval-source-map',
  entry: ['babel-polyfill', './src/main.jsx'],
  output: {
    path: PATHS.build,
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, 'src')
      ],
      test: /\.(js|jsx|es6)$/,
      exclude: /(node_modules|bower_components)/,
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react']
      }
    }, , {
      test: /\.json?$/,
      loader: 'json-loader'
    },{
      include: [
        path.resolve(__dirname, 'styles')
      ],
      test: /\.css$/,
      loader: 'style-loader'
    }, {
      include: [
        path.resolve(__dirname, 'styles')
      ],
      test: /\.css$/,
      loader: 'css-loader',
      query: {
        modules: true,
        localIdentName: '[name]__[local]___[hash:base64:5]'
      }
    }]
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx', '.json', '.css']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: true,
      sourcemap: false,
      beautify: false,
      dead_code: true
    })    
  ]
};
