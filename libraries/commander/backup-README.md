# 从 0 到 1 搭建现代化前端脚手架

## 为什么需要脚手架

1. 重复的事情简单化
2. 项目基础标准化
3. 插件可插拔
4. 规范一致性

## Roadmap

- [x] 项目环境搭建(支持 Typescript,输出 Node ESM 包)
- [x] 交互式收集模板创建选项
- [x] 脚手架自更新
- [x] 收集模板选项,生成或拉取目标模板,替换模板变量
- [x] 支持拉取自定义模板
- [x] 支持对内置模板进行插件的插拔
- [ ] 支持生成快捷代码片段(可指定远程代码片段),快速创建标准代码

## 项目环境搭建

本文将以 ESM 包为产物搭建,以适应社区[CommonJS to ESM](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)的变化.

Github 仓库地址持续更新: [@compass-aiden/commander](https://github.com/Aiden-FE/compass-commander.git)

### 初始化项目

> 本文默认采用 pnpm 管理依赖,实际操作时可替换为 npm,yarn 等

`mkdir compass-commander` 创建项目文件夹
`npm init` 初始化项目

`mkdir src` 创建源代码文件夹
`touch src/main.ts` 创建入口文件

main.ts 初始内容:

```typescript
export default () => {
  console.log('入口文件');
};
```

此时的目录如下:
.
├── LICENSE
├── README.md
├── package.json
└── src
└── main.ts

### 建立 Rollup 打包环境

`touch .gitignore` 创建 git 忽略配置,具体内容因人而异,这里不做展示

`touch rollup.config.js` 创建打包入口文件

`pnpm add rollup rimraf @rollup/plugin-json rollup-plugin-ts rollup-plugin-terser rollup-plugin-cleanup rollup-plugin-summary @rollup/plugin-commonjs -D` 安装构建所需依赖

`pnpm add typescript @zerollup/ts-transform-paths @types/node -D` 安装 typescript 环境依赖

`npx tsc --init` 初始化 tsconfig.json 文件,并内容如下所示,更具体的可以根据个人需求调整:

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext"],
    "module": "NodeNext",
    "moduleResolution": "node",
    "baseUrl": "./",
    "paths": {
      "~": ["src"],
      "~/*": ["src/*"]
    },
    "resolveJsonModule": true,
    "declaration": true,
    "outDir": "./dist",
    "declarationDir": "types",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true,
    "plugins": [{ "transform": "@zerollup/ts-transform-paths" }]
  },
  "include": ["./src/**/*"],
  "exclude": ["node_modules"]
}
```

`touch index.js` 创建一个 command 入口文件,初始内容如下:

```js
#!/usr/bin/env node

import main from './dist/main.js';

main();
```

接下来对我们的 package.json 文件做出一些调整,删除 main 字段并修改如下字段内容

```json
{
  "type": "module" /* 声明这是一个ESM库 */,
  "exports": "./dist/main.js",
  "types": "types/main.d.ts",
  "engines": {
    "node": ">=14.16" /* node 对 esm的支持需要大于这个版本才比较稳定 */
  },
  "files": ["dist", "types", "index.js"] /* 需要被发布的文件 */,
  "bin": {
    "compass": "index.js" // command 入口
  },
  "publishConfig": {
    "registry": "https://registry.npmjs.org/"
  } /* 发布配置,可根据实际情况调整 */,
  "scripts": {
    "start": "npm run dev",
    "dev": "rollup -w -c rollup.config.js",
    "build": "rollup -c rollup.config.js",
    "prepublish": "npm run clean && npm run build",
    "clean": "rimraf dist && rimraf types"
  }
}
```

还需要对 rollup.config.js 写入如下内容:

```javascript
import json from '@rollup/plugin-json'; // 支持导入json
import ts from 'rollup-plugin-ts'; // 支持ts
import { builtinModules } from 'module';
import { terser } from 'rollup-plugin-terser'; // 压缩
import cleanup from 'rollup-plugin-cleanup'; // 清理注释
import summary from 'rollup-plugin-summary'; // 打包概况
import commonjs from '@rollup/plugin-commonjs'; // cjs to esm

const isProd = !process.env.ROLLUP_WATCH; // 开启watch情况可认为是开发环境

/**
 * @description 获取构建插件
 * @param {('serve'|'nodeResolve'|'commonjs'|'compiler'|'terser'|'cleanup'|'summary')[]} disablePlugins 待禁用的插件
 * @return {(Plugin|false|{generateBundle: generateBundle, name: string})[]}
 */
function getPlugins(disablePlugins = []) {
  return [
    json(),
    ts(),
    !disablePlugins.includes('commonjs') && isProd && commonjs(),
    !disablePlugins.includes('terser') && isProd && terser(),
    !disablePlugins.includes('cleanup') && isProd && cleanup({ comments: 'none' }),
    !disablePlugins.includes('summary') &&
      isProd &&
      summary({
        totalLow: 1024 * 8,
        totalHigh: 1024 * 20,
        showBrotliSize: true,
        showGzippedSize: true,
        showMinifiedSize: true,
      }),
  ];
}

/**
 * @description 获取要排除的外部选项
 * @param {string[]} additionalExternal
 * @return {string[]}
 */
function getExternal(additionalExternal = []) {
  return [...builtinModules].concat(additionalExternal || []);
}

/**
 * @description 获取输出配置项
 * @param options 文档: https://www.rollupjs.com/guide/big-list-of-options
 * @return {Record<string, unknown>}
 */
function getOutput(options = { format: 'esm' }) {
  return {
    dir: 'dist',
    chunkFileNames: 'bundle/chunk.[format].[hash].js',
    entryFileNames: '[name].js',
    sourcemap: !isProd,
    ...options,
  };
}

export default [
  {
    input: 'src/main.ts',
    output: getOutput(),
    external: getExternal(),
    plugins: getPlugins(),
    watch: {
      include: ['src/**'],
    },
  },
];
```

> 如果你使用了@rollup/plugin-node-resolve 的话,需要提供选项{ exportConditions: ["node"] }以支持构建

现在我们来验证一下,如今它是否可以运行起来

`pnpm build` 打包输出产物

`npm link` 添加包软链接到当前环境上下文,以便本地调试,后续可通过 `npm unlink @compass-aiden/commander -g` 移除软链接

`compass` 执行命令工具,查看是否执行成功 (**后续本文默认你执行 compass 前已启动 pnpm run dev 开发模式或已执行 pnpm build 构建了产物**)

很好,到了这里我们的命令行指令已经可以运行起来了,接下来就是填充它!

## 建立脚手架实例

`pnpm add commander` 安装 commander 依赖

修改 src/main.ts 内容如下:

```typescript
import { Command } from 'commander';
import { version } from '../package.json';

export default () => {
  const program = new Command();

  program
    .version(`v${version}`, '-v, --version')
    .description('从0到1搭建前端脚手架')
    .usage('<command> [option]')
    .parse(process.argv);
};
```

现在我们来试一试效果

`compass -v` 终端输出脚手架当前的版本信息

## 创建第一个更新检查命令

`mkdir src/commands` 创建命令集文件夹
`touch src/commands/update.cmd.ts` 创建更新命令,初始内容如下:

```typescript
import { Command } from 'commander';

export default (program: Command) => {
  program
    .command('update')
    .description('检查是否存在新版本内容')
    .action(async () => {
      console.log('Run update command');
    });
};
```

`touch src/commands/index.ts` 创建统一出口文件,内容如下:

```typescript
export { default as updateCommand } from './update.cmd';
```

更新 src/main.ts 文件内容:

```typescript
import * as allCommands from './commands';

export default () => {
  // ...其他内容
  Object.keys(allCommands).forEach((key) => (allCommands as Record<string, Function>)[key](program));
  // ...其他内容
};
```

`compass update` 看看终端现在是否成功输出了内容

接下来我们需要思考 update 要做的一些事情:

1. 获取仓库版本列表
2. 取最新版本跟本地版本比较
3. 如果存在新版本确认是否需要更新
4. 如果需要更新则选择包管理工具的偏好(npm,yarn,pnpm, 默认采用 npm 更新)
5. 更新脚手架包

### 支持打印日志及提供 loading 展示支持

由于获取仓库的版本号列表是一个异步行为,终端需要给出友好提示,打印相关日志,我们需要先准备基础的日志服务和提供 loading 功能

`pnpm add chalk` 为了日志的输出能适当美观一些,安装此依赖

`mkdir src/services` 创建服务集文件夹
`touch src/services/logger.service.ts` 创建日志服务文件,并初始化内容如下,当然也可以根据自身实际需要做出调整:

```typescript
import chalk from 'chalk';

class LoggerService {
  private debugLevel = 1; // 0=debug;1=info;2=warn,success;3=error

  /**
   * @description 设置debug级别,设置后默认日志仅输出大于等于当前级别的日志信息,默认级别初始化为1
   * @param level 0=debug;1=info;2=warn,success;3=error
   */
  public setDebugLevel(level: 0 | 1 | 2 | 3) {
    this.debugLevel = level;
  }

  /**
   * @param msg 消息内容
   * @param [print=true] 是否打印日志,为否的的话则不打印日志
   * @return {string} 返回被着色后的文本消息
   */
  public debug(msg: string, print = true) {
    const text = chalk.white(this.formatLog(msg, '🔧'));
    if (print && this.debugLevel <= 0) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }

  public info(msg: string, print = true) {
    const text = chalk.cyan(this.formatLog(msg, '💡'));
    if (print && this.debugLevel <= 1) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }

  public success(msg: string, print = true) {
    const text = chalk.green(this.formatLog(msg, '✔️'));
    if (print && this.debugLevel <= 2) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }

  public warning(msg: string, print = true) {
    const text = chalk.hex('#FFA500')(this.formatLog(msg, '‼️'));
    if (print && this.debugLevel <= 2) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }

  public error(msg: string, print = true) {
    const text = chalk.red(this.formatLog(msg, '🚫'));
    if (print && this.debugLevel <= 3) {
      // eslint-disable-next-line no-console
      console.log(text);
    }
    return text;
  }

  private formatLog(str: string, prefix?: string) {
    return `[${this.formatDate(new Date())}]:\t${prefix ? `${prefix}  ` : ''}${str}`;
  }

  private formatDate(date: Date, format = 'YYYY-MM-DD hh:mm:ss') {
    let str = format;
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();
    const h = date.getHours().toString();
    const m = date.getMinutes().toString();
    const s = date.getSeconds().toString();
    str = str.replace('YYYY', year);
    str = str.replace('MM', month.length > 1 ? month : `0${month}`);
    str = str.replace('DD', day.length > 1 ? day : `0${day}`);
    str = str.replace('hh', h.length > 1 ? h : `0${h}`);
    str = str.replace('mm', m.length > 1 ? m : `0${m}`);
    str = str.replace('ss', s.length > 1 ? s : `0${s}`);
    return str;
  }
}

export default new LoggerService();
```

`pnpm add ora` 安装此依赖来支持 loading 的展示

### 获取仓库的版本列表

`pnpm add got` 安装基础的请求库

首先准备一个获取指定仓库版本列表的方法
`mkdir src/http` 创建文件夹

`touch src/http/index.ts` 创建入口文件

`touch src/http/github.ts` 创建一个专门用来放置 github 接口的文件夹

`touch src/http/interfaces.ts` 创建一个存放 http 接口类型的文件

导出一个 github 版本返回数据的接口类型,src/http/interfaces.ts 内容如下

```typescript
/** Github 版本数据项 */
export interface GithubReleases {
  id: string;
  /** 发布名称 */
  name: string;
  /** 标签名 */
  tag_name: string;
  /** 发布描述 */
  body: string;
  /** 是否草稿版 */
  draft: boolean;
  /** 是否预发布 */
  prerelease: boolean;
  created_at: string;
  published_at: string;
}
```

再导出一个获取 github 仓库版本列表的方法,src/http/github.ts 内容如下

```typescript
import got from 'got';
import { GithubReleases } from './interfaces';

/**
 * @description 获取Github的仓库版本列表
 * @param username github用户名
 * @param repo 仓库名
 */
export function getRepoReleasesInGithub(username: string, repo: string) {
  return got
    .get(`https://api.github.com/repos/${username}/${repo}/releases`, {
      headers: {
        accept: 'application/vnd.github.v3+json',
      },
    })
    .json<GithubReleases[]>()
    .then((result) => {
      // 过滤掉草稿版或者预发布版
      return result.filter((release) => !release.draft && !release.prerelease);
    });
}
```

再在 http 入口文件导出它,src/http/index.ts 内容如下

```typescript
export * from './github';
```

### 实现最终更新逻辑

先安装一些必要的依赖
`pnpm add inquirer shelljs` 安装交互库及终端执行库
`pnpm add @types/inquirer @types/shelljs -D` 安装相关的类型文件

现在我们来根据前面讲的思路来实现这个逻辑,src/commands/update.cmd.ts 文件内容现在如下

```typescript
import { Command } from 'commander';
import ora from 'ora';
import inquirer from 'inquirer';
import shell from 'shelljs';
import { Logger } from '~/services';
import { getRepoReleasesInGithub } from '~/http';
import compareVersion from '~/utils';
import pkg from '../../package.json';

export default (program: Command) => {
  program
    .command('update')
    .description('检查是否存在新版本内容')
    .action(async () => {
      const loading = ora();
      loading.start(Logger.info('正在检查版本信息', false));
      const releases = await getRepoReleasesInGithub('Aiden-FE', 'compass-commander');
      const lastVersion = releases?.[0]?.name;
      // 这里来检查当前是否是最新版本
      if (!lastVersion || compareVersion(pkg.version, lastVersion) >= 0) {
        loading.succeed(Logger.success('当前已是最新版本', false));
        return;
      }
      loading.warn(Logger.warning('发现新版本', false));
      // 与用户交互,确定用户的选择倾向
      inquirer
        .prompt([
          {
            type: 'confirm',
            name: 'isUpdate',
            message: '是否立即更新',
            default: true,
          },
        ])
        .then((options) => {
          if (!options.isUpdate) return;
          // 不同用户的包管理工具可能大不一样,这里让其选择,后面可以研究自动匹配本地包管理工具
          inquirer
            .prompt([
              {
                type: 'list',
                name: 'commandType',
                message: '请选择对应工具更新',
                choices: [
                  { name: 'npm', value: 'npm' },
                  { name: 'yarn', value: 'yarn' },
                  { name: 'pnpm', value: 'pnpm' },
                ],
              },
            ])
            .then((opts) => {
              const updateLoading = ora();
              updateLoading.start(Logger.info('开始更新', false));
              switch (opts.commandType) {
                case 'npm':
                  shell.exec(`npm install -g ${pkg.name}`);
                  break;
                case 'yarn':
                  shell.exec(`yarn global add ${pkg.name}`);
                  break;
                case 'pnpm':
                  shell.exec(`pnpm add ${pkg.name} --global`);
                  break;
                default:
                  break;
              }
              updateLoading.succeed(Logger.success('更新成功,当前已是最新版本.', false));
            });
        });
    });
};
```

现在我们可以来试一试效果了

`compass update`

## 创建模板命令

接下来我们要实现拉取一个远程模板的功能

### 收集用户模板选项

预期用户的命令应该是`compass create <project_name>`

询问的步骤:

1. 选择模板类型 (展示内置模板列表及自定义模板选项)
2. 指定模板仓库地址 (内置模板跳过)
3. 根据配置选择可用插件 (非内置模板跳过)
4. 拉取目标模板并应用插件
