---
title: Compass 工具函数库
description: Compass 通用工具函数库
permalink: /utils/
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

### Properties

#### Demo

**版本**:

**描述**:

**类型**:

**示例**:

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
