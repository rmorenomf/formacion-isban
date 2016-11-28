'use strict';

const path = require("path");
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/app/main.ts',
        vendor: [
            'es6-shim',
            'angular2/bundles/angular2-polyfills',
            'angular2/bootstrap',
            'angular2/platform/browser',
            'angular2/platform/common_dom',
            '@angular/core',
            'angular2/router',
            'angular2/http',
            'redux',
            'redux-thunk',
            'ng2-redux',
            'redux-logger'
        ]
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: "/",
        sourceMapFilename: '[name].js.map'
    }
}