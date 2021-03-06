import json from '@rollup/plugin-json' // json加载
import ts from "rollup-plugin-ts";
import { terser } from 'rollup-plugin-terser' // 代码压缩
import cleanup from 'rollup-plugin-cleanup';
import summary from 'rollup-plugin-summary'
import { nodeResolve } from '@rollup/plugin-node-resolve' // 第三方模块加载
import commonjs from '@rollup/plugin-commonjs' // cjs模块加载
import {builtinModules} from "module";

import pkg from '../package.json'
const moduleList = require('./modules-entry')

const umdPlugins = [
    nodeResolve({ browser: true }),
    commonjs()
];
const umdName = pkg.name;
const filename = 'compass-utils'

const compressionPlugins = [
    json(),
    ts(),
    terser(),
    cleanup({comments: 'none'}),
    summary({
        totalLow: 1024 * 8,
        totalHigh: 1024 * 20,
        showBrotliSize: true,
        showGzippedSize: true,
        showMinifiedSize: true,
    })
]

function entry(input, output, externalKeys = []) {
    return {
        input,
        output,
        external: [...builtinModules.concat(externalKeys)],
        plugins: [...umdPlugins, ...compressionPlugins]
    }
}

export default [
    entry('./src/main.ts', [{ file: `dist/${filename}.umd.min.js`, format: 'umd', sourcemap: false, name: umdName }]),
    entry(moduleList, [{
        dir: 'dist',
        name: umdName,
        chunkFileNames: 'bundle/chunk.[format].[hash].js',
        entryFileNames: '[name].js',
        format: 'es',
        sourcemap: false
    }]),
    entry(moduleList, [{
        dir: 'dist',
        name: umdName,
        format: 'cjs',
        chunkFileNames: 'bundle/chunk.[format].[hash].js',
        entryFileNames: '[name].[format].js',
        sourcemap: false
    }])
]
