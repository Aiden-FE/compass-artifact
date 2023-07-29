---
title: Compass utils library
description: Compass universal utils library
permalink: /en/utils/
headerDepth: 4
---

# @compass-aiden/utils

> Compass universal utils library

## Getting started

`npm install @compass-aiden/utils` Install dependencies

ESModule environment use:

```typescript
import { VERSION } from '@compass-aiden/utils';
console.log('Current utils version is %s', VERSION);
```

Commonjs environment use:

```typescript
const { VERSION } = require('@compass-aiden/utils');
console.log('Current utils version is %s', VERSION);
```

UMD environment use:

```html
<script src="https://cdn.jsdelivr.net/npm/@compass-aiden/utils/dist/main.umd.min.js"></script>
<script>
  const { VERSION } = window.CompassUtils;
  console.log('Current utils version is %s', VERSION);
</script>
```

## List of available utils

### String

#### encodePhoneNumber

**Version**:

1.6.3

**Description**:

Encrypted mobile phone number, desensitization processing

**Type**:

```typescript
type encodePhoneNumber = (
  /** Mobile phone number or international number */
  phone: string,
  /** Configuration */
  option?: {
    /**
     * @description length of encrypted characters
     * @default 4
     */
    encodeLength?: number;
    /**
     * @description The length of the offset to the right affects the distance of the encrypted block from the left.
     * @default 3
     */
    offsetLength?: number;
    /**
     * @description Whether it is an international number
     * @default false
     */
    isCountry?: boolean;
    /**
     * @description The separator after the international code, such as the separator of '86 176' is ' '
     * @default ' '
     */
    countryAfterSymbol?: string;
    /**
     * @description Replacement characters for the mask
     * @default *
     */
    maskChar?: string;
  },
) => string;
```

**Example**:

```typescript
encodePhoneNumber('13533334444'); // => 135****4444
encodePhoneNumber('+86 13533334444', { isCountry: true }); // => +86 135****4444
```

#### replaceVariablesInString

**Version**:

1.6.3

**Description**:

Replace variables wrapped in a string

**Type**:

```typescript
type replaceVariablesInString = (
  /** String template */
  templateString: string,
  /** Parameter object */
  params: Record<string, string>,
) => string;
```

**Example**:

```typescript
const str = 'This is test {{ test }} string.';
replaceVariablesInString(str, { test: 'hello' }); // => 'This is test hello string.'
```

### Function

#### promiseTask

**Version**:

1.6.3

**Description**:

Asynchronous transaction processing, catching exceptions does not block the program.

**Type**:

```typescript
type promiseTask = <Result = unknown, ExtraProperty extends object = object>(
  /**
   * @description asynchronous task
   */
  promise: Promise<Result>,
  /**
   * @description Append the data attribute extra inside the attribute of the error message
   */
  errorExt?: ExtraProperty,
) => Promise<[(Error & ExtraProperty) | Error | null, Result | null]>;
```

Return:

Return on Success`[null, Result]`,Return on failure`[(Error & ExtraProperty) | Error, null]`

**Example**:

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

**Version**:

1.7.0

**Description**:

Date format

**Type**:

```typescript
/**
 * @description Date format
 * @param date
 * @param format Format string; YYYY year, MM month, DD day, hh hours, mm minutes, ss seconds, SSS milliseconds
 * @param [option] Configuration
 * @param [option.isPadStart=true] Whether to fill characters
 * @param [option.padSymbol='0'] Fill character
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

**Example**:

```typescript
import { formatDate } from '@compass-aiden/utils';

formatDate(); // Returns the current time in the format 'YYYY-MM-DD hh:mm:ss'
formatDate('2020/03/12'); // Specifies the time string that can be processed by Date, in the format of 'YYYY-MM-DD hh:mm:ss'
formatDate(Date.now(), 'YYYY/MM/DD'); // Specifies a timestamp that can be processed by Date, in the format 'YYYY/MM/DD'
```

### Class

#### ThemeManager

**Version**:

1.6.2

**Description**:

Theme Manager Based on CSS variables and DOM

**Type**:

```typescript
type ThemeVariables = Record<string, string | number>;
type TMToggleCallback = (themeName: string | undefined, themeData: ThemeVariables | null) => void;
interface TMConstructor {
  /**
   * @description Root node of topic variable mount
   * @default 'html'
   * @example
   *   '#id', '.class', document.querySelector('.anyElement')
   */
  root?: string | Element | null;
  /** Common theme variables that will be inherited by each theme */
  baseVariables?: ThemeVariables;
  hooks?: {
    /** Triggered after switching themes. When it is set to empty and no theme is applied, it is passed in (undefined, null) => void */
    afterToggle?: TMToggleCallback;
    /** Triggered after system theme changes */
    afterSystemThemeChange?: (systemTheme: 'light' | 'dark') => void;
  };
  /**
   * @description Whether to disable automatic follow of system theme if no theme is set or theme is default
   * @todo When the system theme is automatically followed, the theme data named light or dark is automatically applied. If it does not exist, the theme is not applied.
   */
  disableFollowSystemTheme?: boolean;
}
declare class ThemeManager {
  /** Current System theme */
  systemTheme: 'light' | 'dark';
  constructor(opt: TMConstructor);
  /** Register theme */
  register(themeName: string, themeData: ThemeVariables): this;
  /** Unregister theme */
  unregister(themeName: string): this;
  /** Toggle theme */
  toggle(themeName?: string): this;
  /** Get current theme */
  getCurrentTheme(): string | null;
  /** Get theme Data */
  getThemeData(themeName?: string): ThemeVariables | null;
  /** Unregister theme Data */
  destroy(): void;
}
```

**Example**:

```typescript
const theme = new ThemeManager({
  baseVariables: { '--scope-font-color': '#212121' }, // public variable of the declaration base, inherited by all registered subjects
});
// Theme Registration
theme
  .register('light', {
    '--scope-page-background-color': '#FFFFFF',
  })
  .register('dark', {
    '--scope-page-background-color': 'black',
    '--scope-font-color': '#FFFFFF',
  });
theme.toggle('light'); // Switch light theme
theme.toggle(); // Toggle to null, no theme applied, or specify 'default' and automatically follow theme when the disable Follow System Theme is not used
theme.getCurrentTheme(); // Gets the currently used theme ID, for example: 'light'
theme.getThemeData(); // Returns data for the currently used theme
theme.getThemeData('dark'); // Gets the specified theme variable, and returns the data of the currently used theme by default if
theme.unregister('purple'); // Remove a registered topic
theme.destroy(); // Remove the theme manager and release the internal reference resources
```

#### Logger

**Version**:

1.7.0

**Description**:

Logger

**Type**:

```typescript
/** Log Configuration Options */
interface LoggerOption {
  /** Business Domain Title */
  subject: string;
  /** Log output level, the lowest debug level, the highest error level, greater than or equal to the specified level will print the log */
  logLevel: 'debug' | 'log' | 'info' | 'success' | 'warn' | 'error';
  /** Title Prefix */
  prefix: string;
  /** Title Suffix */
  suffix: string;
  /** Log Format String */
  dateFormat: string | boolean;
  /** Date digit filled with 0 */
  isDatePadZero: boolean;
  /** Log style */
  styles: {
    debug: string;
    log: string;
    info: string;
    success: string;
    warn: string;
    error: string;
  };
  /** The hook function after printing can be used to implement the log stack or write log files by node. */
  afterPrintln?: (...args: unknown[]) => void;
}
/**
 * @description Logger
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

**Example**:

```typescript
import { Logger } from '@compass-aiden/utils';
// Singleton pattern use
console.log(Logger.config); // Default Configuration
Logger.config.logLevel = 'debug'; // Modify a single configuration
Logger.updateConfig({
  logLevel: 'debug',
  dateFormat: 'YYYY-MM-DD hh:mm:ss:SSS',
}); // Batch Modify Configuration
Logger.debug('Hello world');
Logger.log('Hello world');
Logger.info('Hello world');
Logger.success('Hello world');
Logger.warn('Hello world');
Logger.error('Hello world');

// Multiple case mode usage
const loggerMulti = new Logger();
console.log(loggerMulti.config); // Default Configuration
loggerMulti.config.logLevel = 'debug'; // Modify a single configuration
loggerMulti.updateConfig({
  subject: 'Aiden2',
  logLevel: 'debug',
  dateFormat: 'YYYY-MM-DD hh:mm:ss',
}); // Batch Modify Configuration
loggerMulti.debug('Hello world');
loggerMulti.log('Hello world');
loggerMulti.info('Hello world');
loggerMulti.success('Hello world');
loggerMulti.warn('Hello world');
loggerMulti.error('Hello world');
```

### Util

#### compareVersion

**Version**:

1.6.3

**Description**:

Compare the size of two versions

**Type**:

`(currentVersion: string, comparedVersion: string, trimSymbolPattern?: RegExp): 1 | -1 | 0`

- currentVersion Current version
- comparedVersion Versions compared
- trimSymbolPattern Optional. It is a regular expression. Qualifying characters are compared after they are removed. By default, the v character is matched.

Return:

1 Greater than compare version;

-1 Less Than compare version;

0 Equal to compare version.

**Example**:

```typescript
import { compareVersion } from '@compass-aiden/utils';

compareVersion('v1.0.0', '2.0.0'); // => -1
compareVersion('a2.0.0', 'B1.0.0', /a|b/gi); // => 1
compareVersion('v1.0.0', 'V1.0.0'); // => 0
```

#### downloadFile

**Version**:

1.6.3

**Description**:

File download method

**Type**:

`(data: BlobPart, filename: string, blobOption: BlobPropertyBag): void`

- data, Data that can be processed by a blob
- filename, The specified file name
- blobOption, Configuration options when blob processes data

**Example**:

```typescript
downloadFile(excelData, 'example.xlsx');
```

### Properties

#### VERSION

**Version**:

1.6.3

**Description**:

Version of @compass-aiden/utils currently in use.

**Type**:

`string`

**Example**:

```typescript
import { VERSION } from '@compass-aiden/utils';

console.log('Current utils version is %s', VERSION);
```
