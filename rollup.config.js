const path = require('path');

import babel from 'rollup-plugin-babel';
import merge from 'lodash.merge';
import pkg from './package.json';
import resolve from 'rollup-plugin-node-resolve';
import url from "rollup-plugin-url";

import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';

import copy from 'rollup-plugin-copy-assets';

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
        presets: [
            ['@babel/preset-env', {
                modules: false,
                targets: {
                    browsers: ['ie >= 9']
                }
            }]
        ]
    },
    url :{
        limit: 10 * 1024, // inline files < 10k, copy files > 10k
        include: ["**/*.svg"], // defaults to .svg, .png, .jpg and .gif files
        emitFiles: true // defaults to true
    },
    uglify: {
        beautify: {
            compress: false,
            mangle: false,
            output: {
                beautify: true,
                comments: /(?:^!|@(?:license|preserve))/
            }
        },
        minify: {
            compress: true,
            mangle: true,
            output: {
                comments: new RegExp(pkg.name)
            }
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
        uglify(pluginSettings.uglify.minify)
    ]
});

const pluginCJS = merge({}, config, {
    input: path.resolve(__dirname, 'src', 'book', 'plugin.js'),
    output: {
        file: path.resolve(__dirname, 'dist', 'book', 'plugin.js'),
        format: 'cjs'
    },
    plugins: [
        uglify(pluginSettings.uglify.minify),
        copy({
          assets: [
            './src/book/style.css'
          ]
        })
    ]
});

export default [
  indexCJS,
  pluginCJS
];
