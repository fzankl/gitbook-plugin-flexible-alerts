const path = require('path');

import babel from '@rollup/plugin-babel';
import merge from 'lodash.merge';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy-assets';

import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';

// Banner
const bannerData = [
  `${pkg.name}`,
  `v${pkg.version}`,
  `${pkg.homepage}`,
  `(c) ${(new Date()).getFullYear()} ${pkg.author}`,
  `${pkg.license} license`
];

// Plugins
const pluginSettings = {
  eslint: {
    exclude: ['node_modules/**', './package.json', '**.css'],
    throwOnWarning: false,
    throwOnError: true
  },
  babel: {
    exclude: ['node_modules/**'],
    babelHelpers: 'bundled',
    presets: [
      ['@babel/preset-env', {
        modules: false,
        targets: {
          browsers: ['ie >= 9']
        }
      }]
    ]
  },
  url: {
    limit: 10 * 1024, // inline files < 10k, copy files > 10k
    include: ["**/*.svg"], // defaults to .svg, .png, .jpg and .gif files
    emitFiles: true // defaults to true
  },
  terser: {
    compress: true,
    mangle: true,
    output: {
      comments: new RegExp(pkg.name)
    }
  }
};

// Config Base
const config = {
  output: {
    banner: `/*!\n * ${bannerData.join('\n * ')}\n */`,
    sourcemap: true
  },
  plugins: [
    url(pluginSettings.url),
    resolve(),
    eslint(pluginSettings.eslint),
    babel(pluginSettings.babel)
  ],
  watch: {
    clearScreen: false
  }
};

// Format: CJS
const indexCJS = merge({}, config, {
  input: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    file: path.resolve(__dirname, 'dist', 'index.js'),
    format: 'cjs'
  },
  plugins: [
    terser(pluginSettings.terser)
  ]
});

const pluginCJS = merge({}, config, {
  input: path.resolve(__dirname, 'src', 'book', 'plugin.js'),
  output: {
    file: path.resolve(__dirname, 'dist', 'book', 'plugin.js'),
    format: 'cjs'
  },
  plugins: [
    terser(pluginSettings.terser),
    copy({
      assets: [
        './style.css'
      ]
    })
  ]
});

export default [
  indexCJS,
  pluginCJS
];
