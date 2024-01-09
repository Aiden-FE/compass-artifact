import { readFileSync, writeFileSync } from 'fs';
import childProcess from 'child_process';
import chalk from 'chalk';
import inquirer from 'inquirer';
import { checkPathExists, createFile, pathJoin, scanNpmManager } from '~/utils';
import { Loading } from '~/services';
import { PRESET_PRETTIERRC } from '~/constants';

export default class Prettier {
  private option: {
    manager: 'npm' | 'pnpm' | 'yarn';
    cwd: string;
  };

  constructor(option?: { manager?: 'npm' | 'pnpm' | 'yarn'; cwd?: string }) {
    this.option = {
      manager: option?.manager || scanNpmManager(),
      cwd: option?.cwd || process.cwd(),
    };
  }

  async addPrettierPlugin() {
    const loading = new Loading(chalk.cyan('正在处理Prettier配置文件'));
    const printLog = [] as string[];
    const configFilePath = pathJoin(this.option.cwd, '.prettierrc.json');
    let isCreated = false;
    if (!checkPathExists(configFilePath)) {
      createFile('.prettierrc.json', JSON.stringify({}), { cwd: this.option.cwd });
      printLog.push(chalk.green(`Crated ${configFilePath}`));
      isCreated = true;
    }
    const jsonData = JSON.parse(readFileSync(configFilePath, 'utf8'));
    let isModified = false;
    // 写入配置项
    Object.keys(PRESET_PRETTIERRC).forEach((key) => {
      if (!jsonData[key]) {
        jsonData[key] = PRESET_PRETTIERRC[key];
        isModified = true;
      }
    });
    if (!isCreated && isModified) {
      printLog.push(chalk.yellow(`Modified ${configFilePath}`));
    }
    writeFileSync(configFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
    loading.pause();
    const isAddEslint = await inquirer.prompt([
      {
        type: 'confirm',
        message: '您是否需要添加Eslint相关配置?',
        default: false,
      },
    ]);
    loading.resume(chalk.cyan('安装依赖项'));
    const devDeps = isAddEslint ? 'prettier' : 'prettier eslint-config-prettier eslint-plugin-prettier';
    try {
      // 安装依赖
      childProcess.execSync(`${this.option.manager} add -D ${devDeps}`, {
        cwd: this.option.cwd,
        stdio: 'inherit',
      });
      printLog.push(chalk.yellow(`Installed devDependencies ${devDeps}`));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      loading.fail('安装依赖失败,您可以手动执行安装或修复错误后再次重试');
    }
    const pkgFilePath = pathJoin(this.option.cwd, 'package.json');
    const pkgData = JSON.parse(readFileSync(pkgFilePath, 'utf8'));
    let isModifiedPkg = false;

    if (!pkgData.scripts) {
      pkgData.scripts = {};
    }
    if (!pkgData.scripts.format) {
      pkgData.scripts.format = 'prettier . --write';
      isModifiedPkg = true;
      printLog.push(chalk.yellow(`Modified ${pkgFilePath}`));
    }
    if (!isAddEslint) {
      writeFileSync(pkgFilePath, JSON.stringify(pkgData, null, 2), 'utf8');
      // eslint-disable-next-line no-console
      console.log(`\n${printLog.join('\n')}`);
      loading.succeed(chalk.green('Prettier 插件安装成功'));
      return;
    }
    if (pkgData.eslintConfig) {
      if (!pkgData.eslintConfig.extends) {
        pkgData.eslintConfig.extends = [];
      }
      if (!Array.isArray(pkgData.eslintConfig.extends)) {
        pkgData.eslintConfig.extends = [pkgData.eslintConfig.extends];
      }
      if (!pkgData.eslintConfig.extends.includes('plugin:prettier/recommended')) {
        pkgData.eslintConfig.extends.push('plugin:prettier/recommended');
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        !isModifiedPkg && printLog.push(chalk.yellow(`Modified ${pkgFilePath}`));
      }
      // eslint-disable-next-line no-console
      console.log(`\n${printLog.join('\n')}`);
      loading.succeed(chalk.green('Prettier 插件安装成功'));
      return;
    }
    const eslintConfigPath = pathJoin(this.option.cwd, '.eslintrc.json');
    if (checkPathExists(eslintConfigPath)) {
      const eslintJsonData = JSON.parse(readFileSync(eslintConfigPath, 'utf8'));
      // FIXME: 写入prettier配置项
    }
  }
}
