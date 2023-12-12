import path from 'path';
import process from 'process';
import fs, { readFileSync } from 'fs';
import { execSync } from 'child_process';
import { createRequire } from 'module';
import * as acorn from 'acorn';
import { type ecmaVersion } from 'acorn';
// const acorn = require('acorn');

/**
 * @description 比较两个版本的大小
 * @param currentVersion 当前版本
 * @param comparedVersion 比较的版本
 * @param trimSymbolPattern 匹配正则,符合条件的字符在移除后进行比较,默认匹配v字符
 * @return {1 | -1 | 0} 1大于比较版本;-1小于比较版本;0等于比较版本
 * @example
 *   compareVersion('v1.0.0', '2.0.0') // return -1
 *   compareVersion('a2.0.0', 'B1.0.0', /a|b/ig) // return 1
 *   compareVersion('v1.0.0', 'V1.0.0') // return 0
 */
export function compareVersion(currentVersion: string, comparedVersion: string, trimSymbolPattern = /v/gi) {
  const currentVersionClone = currentVersion.replace(trimSymbolPattern, '');
  const compareVersionClone = comparedVersion.replace(trimSymbolPattern, '');
  const v1 = currentVersionClone.split('.');
  const v2 = compareVersionClone.split('.');
  const maxLen = Math.max(v1.length, v2.length);

  // 调整两个版本号位数相同
  while (v1.length < maxLen) {
    v1.push('0');
  }
  while (v2.length < maxLen) {
    v2.push('0');
  }

  // 循环判断每位数的大小
  for (let i = 0; i < maxLen; i += 1) {
    const num1 = parseInt(v1[i], 10);
    const num2 = parseInt(v2[i], 10);

    if (num1 > num2) {
      return 1;
    }
    if (num1 < num2) {
      return -1;
    }
  }

  return 0;
}

export function generateFolder(targetPath: string) {
  const target = path.resolve(process.cwd(), targetPath);
  return new Promise((resolve) => {
    fs.stat(target, (err, stats) => {
      if (err || !stats) {
        fs.mkdirSync(target, { recursive: true });
      }
      resolve(true);
    });
  });
}

export function createFile(
  filePath: string,
  fileData: string | NodeJS.ArrayBufferView,
  options?: { cwd?: string; encoding?: BufferEncoding },
) {
  const target = path.resolve(options?.cwd || process.cwd(), filePath);
  fs.writeFileSync(target, fileData, { encoding: options?.encoding || 'utf8' });
}

export function formatDate(date: Date, format = 'YYYY-MM-DD hh:mm:ss') {
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

/**
 * 命令是否存在
 * @param command
 */
export function isCommandExists(command: string) {
  try {
    // 使用execSync执行命令，并捕获命令执行结果
    execSync(`command -v ${command}`, { stdio: 'ignore' });
    // 如果执行成功，返回true
    return true;
  } catch (error) {
    // 如果执行失败，则捕获到错误，说明命令不存在，返回false
    return false;
  }
}

/**
 * 检查路径下文件或文件夹是否存在
 * @param path
 */
export function checkPathExists(p: string) {
  try {
    fs.accessSync(p);
    return true;
  } catch (err) {
    return false;
  }
}

/**
 * 合并路径
 * @param args
 */
export function pathJoin(...args: string[]) {
  return path.join(...args);
}

/**
 * 读取模块文件
 * @param filePath
 */
export function requireModule(filePath: string) {
  // @ts-ignore
  const requireFunc = createRequire(import.meta.url);
  return requireFunc(filePath);
}

/**
 * 获取文件的ast语法书
 * @param filePath 文件路径
 * @param options 配置项
 * @returns {acorn.Program}
 */
export function getASTTreeOfFile(
  filePath: string,
  options?: { cwd?: string; encoding?: BufferEncoding; ecmaVersion?: ecmaVersion },
) {
  const { cwd, encoding } = {
    encoding: 'utf8' as const,
    cwd: process.cwd(),
    ...options,
  };
  const target = typeof cwd !== 'undefined' ? path.resolve(cwd, filePath) : filePath;
  const code = readFileSync(target, { encoding });
  const ast = acorn.parse(code, { ecmaVersion: options?.ecmaVersion || 7 });
  return ast;
}
