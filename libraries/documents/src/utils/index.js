import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

/**
 * @description 在文件夹内查找匹配文件
 * @param {string} folderPath
 * @param {RegExp} includesReg
 * @param {RegExp} excludesReg
 */
export function findFilesInFolder(folderPath, includesReg, excludesReg = /(node_modules|dist)+/i) {
  const filesOrFolders = fs.readdirSync(folderPath);
  const filesPath = [];
  filesOrFolders.forEach((name) => {
    if (excludesReg.test(name)) return;
    const fileDir = path.join(folderPath, name);
    const stats = fs.statSync(fileDir);
    if (stats.isFile() && includesReg.test(name)) {
      filesPath.push(fileDir);
    } else if (stats.isDirectory()) {
      const childrenEntry = findFilesInFolder(fileDir, includesReg);
      filesPath.push(...childrenEntry);
    }
  });
  return filesPath;
}

/**
 * @description 将文件批量复制到指定路径下
 * @param {string[]} filesPath
 * @param {string} targetPath
 */
export function cpFiles(filesPath, targetPath) {
  try {
    fs.statSync(targetPath);
  } catch {
    fs.mkdirSync(targetPath, { recursive: true });
    console.log('收到异常,创建目标文件夹');
  }
  filesPath.map((filePath) => {
    fs.copyFileSync(filePath, path.join(targetPath, filePath.split(os.type() === 'Windows_NT' ? '\\' : '/').pop()));
  });
}
