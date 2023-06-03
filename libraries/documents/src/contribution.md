---
title: 贡献文档
description: 研发人员贡献引导文档
---

# 贡献文档

## 本地开发

### 安装 Rush

:::info

如果你本地已存在 rush 命令则跳过此步骤,可通过`rush -h`检查

:::

::: tabs#npmManager

@tab:active pnpm

```shell
pnpm add @microsoft/rush --global
```

@tab npm

```shell
npm add -g @microsoft/rush
```

@tab yarn

```shell
yarn add -g @microsoft/rush
```

:::

### 恢复依赖项

通过 `rush update` 恢复依赖

:::warning
如果上面的命令发生异常,或项目是在本地 **首次运行** 发生异常则在根目录执行 `pnpm install`

> 该步骤详情可通过根目录 package.json 查看,实际是 commitlint 的执行上下文找不到依赖包,才需要在根目录恢复此依赖

:::

### 执行项目内命令

在项目路径下执行 `rushx [script_name]` 此命令可运行项目内 scripts 命令

### 管理依赖

> https://rushjs.io/zh-cn/pages/commands/rush_add/

`rush add -p [package_name]` 在对应项目路径下执行添加依赖, --dev 添加开发依赖, -m 为仓库内所有项目同步一致的版本

`rush remove -p [package_name]` 在对应项目路径下执行删除依赖

### Rush 使用文档

[Monorepo usage](https://rushjs.io/)

## 项目结构

```
.
├── common
│   ├── autoinstallers # 与业务无关的依赖或命令脚本
│   ├── config         # 配置
│   ├── git-hooks
│   └── scripts        # rush 脚本
├── apps               # 项目文件夹
├── libraries          # 基础设施包文件夹
│   ├── commander      # 脚手架
│   ├── documents      # 文档项目
│   ├── eslint-config  # eslint 推荐配置包
│   ├── styles         # 通用样式库
│   └── utils          # 工具函数库
└── rush.json          # rush 配置文件
```
