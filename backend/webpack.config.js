const path = require( 'path' )
const NodemonPlugin = require( 'nodemon-webpack-plugin' )
const nodeExternals = require( 'webpack-node-externals' )
const webpack = require( 'webpack' )
const memfs = require( 'memfs' )

module.exports = {
  mode: process.env.NODE_ENV ? 'development' : 'production',
  target: 'node',
  entry: [ './src/main.ts' ],
  output: {
    filename: 'index.js',
    path: path.resolve( __dirname, 'dist' ),
		hotUpdateChunkFilename: 'main.[fullhash].hot-update.js',
		hotUpdateMainFilename: 'main.[fullhash].hot-update.json',
  },
  //outputFileSystem: memfs,
  module: {
    rules: [ { test: /\.(ts|tsx)?$/, use: 'ts-loader', exclude: /node_modules/ } ] 
  },
  plugins:  [
    new webpack.HotModuleReplacementPlugin( ),
    new NodemonPlugin( { quiet: true } )
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.json' ]
  },
  externals: [ nodeExternals( ) ]
}