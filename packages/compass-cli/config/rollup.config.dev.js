import { nodeResolve } from '@rollup/plugin-node-resolve' // 第三方模块加载
import commonjs from '@rollup/plugin-commonjs' // cjs模块加载
import ts from "rollup-plugin-ts";
import json from '@rollup/plugin-json' // json加载
import {builtinModules} from "module";

import pkg from '../package.json'

export default [
    {
        input: './src/main.ts',
        watch: {
            include: 'src/**',
        },
        external: [...builtinModules],
        plugins: [
            nodeResolve(),
            commonjs(),
            json(),
            ts(),
        ],
        output: [{ file: pkg.main, format: 'cjs', sourcemap: true }],
    },
]
