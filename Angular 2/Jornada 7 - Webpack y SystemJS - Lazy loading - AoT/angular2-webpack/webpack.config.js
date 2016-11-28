'use strict';

const webpack = require('webpack');

module.exports = {
  entry: {
    app: './app/boot.ts',
    vendor: [
      '@angular/core',
      '@angular/compiler',
      '@angular/common',
      '@angular/http',
      '@angular/platform-browser',
      '@angular/platform-browser-dynamic',
      '@angular/router',
      'es6-shim',
      'redux',
      'redux-thunk',
      'redux-logger',
      'reflect-metadata',
      'ng2-redux',
      'zone.js',
    ]
  },

  output: {
    path: './dist',
    filename: '[name].js',
    publicPath: "/"
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  module: {
    loaders: [
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [ /\.(spec|e2e)\.ts$/ ] },
      { test: /\.(html|css)$/, loader: 'raw' }      
    ]
  }
}