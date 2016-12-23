var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js', './client'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [new webpack.ProvidePlugin({'$': 'jquery', 'jQuery': 'jquery'})],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.js|.jsx?$/,
        include: path.join(__dirname, './client')
      }, {
        test: /\.(woff2?|svg)$/,
        loader: 'url?limit=10000'
      }, {
        test: /\.(ttf|eot)$/,
        loader: 'file'
      }, {
        test: /\.scss$/,
        loaders: [
          "style", "css", "sass"
        ],
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }
    ]
  }
};
