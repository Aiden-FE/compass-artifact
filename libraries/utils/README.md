---
title: Compass 工具函数库
description: Compass 通用工具函数库
permalink: /utils/
headerDepth: 4
---

# @compass-aiden/utils

> 工具函数库

## 快速上手

`npm install @compass-aiden/utils` 安装依赖

ESModule 环境使用:

```typescript
import { VERSION } from '@compass-aiden/utils';
console.log('Current utils version is %s', VERSION);
```

Commonjs 环境使用:

```typescript
const { VERSION } = require('@compass-aiden/utils');
console.log('Current utils version is %s', VERSION);
```

UMD 环境使用:

```html
<script src="https://cdn.jsdelivr.net/npm/@compass-aiden/utils/dist/main.umd.min.js"></script>
<script>
  const { VERSION } = window.CompassUtils;
  console.log('Current utils version is %s', VERSION);
</script>
```

## 可用实用程序列表

### String

#### encodePhoneNumber

**版本**:

1.6.3

**描述**:

加密手机号码,脱敏处理

**类型**:

```typescript
type encodePhoneNumber = (
  /** 手机号码或国际号码 */
  phone: string,
  /** 配置 */
  option?: {
    /**
     * @description 加密字符的长度
     * @default 4
     */
    encodeLength?: number;
    /**
     * @description 向右偏移长度,影响加密块离左边的距离
     * @default 3
     */
    offsetLength?: number;
    /**
     * @description 是否为国际号码
     * @default false
     */
    isCountry?: boolean;
    /**
     * @description 国际区号后的分割符, 如 +86 176的分割符为' '
     * @default ' '
     */
    countryAfterSymbol?: string;
    /**
     * @description 掩码的替换字符
     * @default *
     */
    maskChar?: string;
  },
) => string;
```

**示例**:

```typescript
encodePhoneNumber('13533334444'); // => 135****4444
encodePhoneNumber('+86 13533334444', { isCountry: true }); // => +86 135****4444
```

#### replaceVariablesInString

**版本**:

1.6.3

**描述**:

替换字符串中包裹起来的变量

**类型**:

```typescript
type replaceVariablesInString = (
  /** 字符串模板 */
  templateString: string,
  /** 参数对象 */
  params: Record<string, string>,
) => string;
```

**示例**:

```typescript
const str = 'This is test {{ test }} string.';
replaceVariablesInString(str, { test: 'hello' }); // => 'This is test hello string.'
```

### Function

#### promiseTask

**版本**:

1.6.3

**描述**:

异步事务处理, 捕获异常不阻塞程序

**类型**:

```typescript
type promiseTask = <Result = unknown, ExtraProperty extends object = object>(
  /**
   * @description 异步任务
   */
  promise: Promise<Result>,
  /**
   * @description 将数据属性额外附加在错误信息的属性内
   */
  errorExt?: ExtraProperty,
) => Promise<[(Error & ExtraProperty) | Error | null, Result | null]>;
```

返回:

成功时返回`[null, Result]`,失败则返回`[(Error & ExtraProperty) | Error, null]`

**示例**:

```typescript
const asyncTask = Promise.all([]);
const asyncTask2 = Promise.all([]);
async function invoke() {
  const [error, result] = await promiseTask(asyncTask);
  if (error) {
    // handle error
    return;
  }
  // handle result

  const [error2, result2] = await promiseTask(asyncTask2, { code: 'custom_error' });
  if (error2?.code === 'custom_error') {
    // handle custom error
    return;
  }
  if (result2) {
    // handle result
  }
}
invoke();
```

### Date

#### formatDate

**版本**:

1.7.0

**描述**:

时间格式化

**类型**:

```typescript
/**
 * @description 时间格式化
 * @param date
 * @param format 格式化字符串; YYYY-年, MM 月, DD 日, hh 时, mm 分, ss 秒, SSS 毫秒
 * @param [option] 配置项
 * @param [option.isPadStart=true] 是否填充字符
 * @param [option.padSymbol='0'] 填充字符
 */
declare function formatDate(
  date?: string | number | Date,
  format?: string,
  option?: {
    isPadStart?: boolean;
    padSymbol?: string;
  },
): string;
```

**示例**:

```typescript
import { formatDate } from '@compass-aiden/utils';

formatDate(); // 返回当前时间,格式为 'YYYY-MM-DD hh:mm:ss'
formatDate('2020/03/12'); // 指定可被Date处理的时间字符串,格式为 'YYYY-MM-DD hh:mm:ss'
formatDate(Date.now(), 'YYYY/MM/DD'); // 指定可被Date处理的时间戳,格式为 'YYYY/MM/DD'
```

### Class

#### ThemeManager

**版本**:

1.6.2

**描述**:

基于 CSS variables 与 DOM 的主题管理器

**类型**:

```typescript
type ThemeVariables = Record<string, string | number>;
type TMToggleCallback = (themeName: string | undefined, themeData: ThemeVariables | null) => void;
interface TMConstructor {
  /**
   * @description 主题变量挂载的根节点
   * @default 'html'
   * @example
   *   '#id', '.class', document.querySelector('.anyElement')
   */
  root?: string | Element | null;
  /** 会被各主题继承的公共主题变量 */
  baseVariables?: ThemeVariables;
  hooks?: {
    /** 切换主题后触发, 当置为空,不应用任何主题时传入的是 (undefined, null) => void */
    afterToggle?: TMToggleCallback;
    /** 系统主题变更后触发 */
    afterSystemThemeChange?: (systemTheme: 'light' | 'dark') => void;
  };
  /**
   * @description 是否禁用 在未设置主题或主题为 default 情况下自动跟随系统主题
   * @todo 自动跟随系统主题时,会自动应用名为 light 或 dark 对应的主题数据,不存在则不应用主题
   */
  disableFollowSystemTheme?: boolean;
}
declare class ThemeManager {
  /** 当前系统主题 */
  systemTheme: 'light' | 'dark';
  constructor(opt: TMConstructor);
  /** 注册主题 */
  register(themeName: string, themeData: ThemeVariables): this;
  /** 取消注册主题 */
  unregister(themeName: string): this;
  /** 切换主题 */
  toggle(themeName?: string): this;
  /** 获取当前主题 */
  getCurrentTheme(): string | null;
  /** 获取主题数据 */
  getThemeData(themeName?: string): ThemeVariables | null;
  /** 注销主题数据 */
  destroy(): void;
}
```

**示例**:

```typescript
const theme = new ThemeManager({
  baseVariables: { '--scope-font-color': '#212121' }, // 声明基础的公共变量,被所有注册主题继承
});
// 主题注册
theme
  .register('light', {
    '--scope-page-background-color': '#FFFFFF',
  })
  .register('dark', {
    '--scope-page-background-color': 'black',
    '--scope-font-color': '#FFFFFF',
  });
theme.toggle('light'); // 切换light主题
theme.toggle(); // 切换为空,不应用任何主题,或指定为'default',且未使用disableFollowSystemTheme时自动跟随主题
theme.getCurrentTheme(); // 获取当前使用的主题标识, 例如: 'light'
theme.getThemeData(); // 返回当前使用主题的数据
theme.getThemeData('dark'); // 获取指定主题变量,不提供参数,则默认返回当前使用主题的数据
theme.unregister('purple'); // 移除已注册的主题
theme.destroy(); // 移除主题管理器,释放内部引用资源
```

#### Logger

**版本**:

1.7.0

**描述**:

日志记录器

**类型**:

```typescript
/** 日志配置选项 */
interface LoggerOption {
  /** 业务域标题 */
  subject: string;
  /** 日志输出级别, debug级别最低,error级别最高,大于等于指定级别均会打印日志 */
  logLevel: 'debug' | 'log' | 'info' | 'success' | 'warn' | 'error';
  /** 标题前缀 */
  prefix: string;
  /** 标题后缀 */
  suffix: string;
  /** 日志格式化字符串 */
  dateFormat: string | boolean;
  /** 日期不足位数是否补0 */
  isDatePadZero: boolean;
  /** 各日志样式 */
  styles: {
    debug: string;
    log: string;
    info: string;
    success: string;
    warn: string;
    error: string;
  };
  /** 打印后的hook函数,可以用来自行实现日志堆栈或node写日志文件 */
  afterPrintln?: (...args: unknown[]) => void;
}
/**
 * @description 日志记录器
 */
declare class Logger {
  static config: LoggerOption;
  config: LoggerOption;
  static updateConfig(option?: Partial<LoggerOption>): void;
  updateConfig(option?: Partial<LoggerOption>): void;
  static debug(...args: unknown[]): void;
  debug(...args: unknown[]): void;
  static log(...args: unknown[]): void;
  log(...args: unknown[]): void;
  static info(...args: unknown[]): void;
  info(...args: unknown[]): void;
  static success(...args: unknown[]): void;
  success(...args: unknown[]): void;
  static warn(...args: unknown[]): void;
  warn(...args: unknown[]): void;
  static error(...args: unknown[]): void;
  error(...args: unknown[]): void;
}
```

**示例**:

```typescript
import { Logger } from '@compass-aiden/utils';
// 单例模式使用
console.log(Logger.config); // 默认配置项
Logger.config.logLevel = 'debug'; // 修改单个配置
Logger.updateConfig({
  logLevel: 'debug',
  dateFormat: 'YYYY-MM-DD hh:mm:ss:SSS',
}); // 批量修改配置
Logger.debug('Hello world');
Logger.log('Hello world');
Logger.info('Hello world');
Logger.success('Hello world');
Logger.warn('Hello world');
Logger.error('Hello world');

// 多例模式使用
const loggerMulti = new Logger();
console.log(loggerMulti.config); // 默认配置项
loggerMulti.config.logLevel = 'debug'; // 修改单个配置
loggerMulti.updateConfig({
  subject: 'Aiden2',
  logLevel: 'debug',
  dateFormat: 'YYYY-MM-DD hh:mm:ss',
}); // 批量修改配置
loggerMulti.debug('Hello world');
loggerMulti.log('Hello world');
loggerMulti.info('Hello world');
loggerMulti.success('Hello world');
loggerMulti.warn('Hello world');
loggerMulti.error('Hello world');
```

### Util

#### compareVersion

**版本**:

1.6.3

**描述**:

比较两个版本的大小

**类型**:

`(currentVersion: string, comparedVersion: string, trimSymbolPattern?: RegExp): 1 | -1 | 0`

- currentVersion 当前版本
- comparedVersion 比较的版本
- trimSymbolPattern 可选, 为正则表达式,符合条件的字符在移除后进行比较,默认匹配 v 字符

返回值:

1 大于比较版本;

-1 小于比较版本;

0 等于比较版本.

**示例**:

```typescript
import { compareVersion } from '@compass-aiden/utils';

compareVersion('v1.0.0', '2.0.0'); // => -1
compareVersion('a2.0.0', 'B1.0.0', /a|b/gi); // => 1
compareVersion('v1.0.0', 'V1.0.0'); // => 0
```

#### downloadFile

**版本**:

1.6.3

**描述**:

文件下载方法

**类型**:

`(data: BlobPart, filename: string, blobOption: BlobPropertyBag): void`

- data 可被 Blob 处理的数据
- filename 指定的文件名
- blobOption blob 处理 data 时的配置选项

**示例**:

```typescript
downloadFile(excelData, 'example.xlsx');
```

### Properties

#### VERSION

**版本**:

1.6.3

**描述**:

当前使用的 @compass-aiden/utils 版本

**类型**:

`string`

**示例**:

```typescript
import { VERSION } from '@compass-aiden/utils';

console.log('Current utils version is %s', VERSION);
```
