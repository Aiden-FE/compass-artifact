import { nodeResolve } from '@rollup/plugin-node-resolve' // 第三方模块加载
import commonjs from '@rollup/plugin-commonjs' // cjs模块加载
import ts from "rollup-plugin-ts";
import json from '@rollup/plugin-json' // json加载
import {builtinModules} from "module";

import pkg from '../package.json'

function entry(input, output) {
    return {
        input,
        output,
        // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
        external: [...builtinModules],
        watch: {
            include: 'src/**'
        },
        plugins: [
            // Allow node_modules resolution, so you can use 'external' to control
            // which external modules to include in the bundle
            // https://github.com/rollup/rollup-plugin-node-resolve#usage
            nodeResolve(),
            // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
            commonjs(),
            // Allow json resolution
            json(),
            // Compile TypeScript files
            ts(),
        ]
    }
}

export default [
    entry('src/main.ts', [
        {
            dir: 'dist',
            name: pkg.name,
            format: 'cjs',
            chunkFileNames: 'bundle/chunk.[format].[hash].js',
            entryFileNames: '[name].[format].js',
            sourcemap: true,
        },
    ]),
]
