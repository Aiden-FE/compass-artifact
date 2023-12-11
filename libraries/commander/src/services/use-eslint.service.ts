import { readFileSync, writeFileSync } from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import { Logger } from '~/services';
import { checkPathExists, pathJoin, createFile } from '~/utils';

interface UseNextCommonOption {
  /**
   * @default npm
   */
  manager?: 'npm' | 'pnpm' | 'yarn';
  /**
   * @default process.cwd()
   */
  cwd?: string;
}

export default function useEslintService(option: UseNextCommonOption) {
  const opt = {
    manager: 'npm',
    cwd: process.cwd(),
    ...option,
  };

  /**
   * @todo
   * 1. 扫描项目下是否存在 .eslintrc.* 文件或者package.json内是否存在eslint配置,不存在则新建文件
   * 2. extends内添加 @compass-aiden/eslint-pugin 插件
   * 3. 修改package.json内的依赖表
   * 4. package.json内scripts增加 lint 命令
   * 5. 打印变更记录
   * 6. 打印引导提示
   */
  async function addEslintPlugin() {
    const loading = ora();
    let fileName = '';
    loading.start(chalk.cyan('正在扫描Eslint配置文件'));
    if (checkPathExists(pathJoin(opt.cwd, '.eslintrc'))) {
      fileName = pathJoin(opt.cwd, '.eslintrc');
    } else if (checkPathExists(pathJoin(opt.cwd, '.eslintrc.js'))) {
      fileName = pathJoin(opt.cwd, '.eslintrc.js');
    } else if (checkPathExists(pathJoin(opt.cwd, '.eslintrc.cjs'))) {
      fileName = pathJoin(opt.cwd, '.eslintrc.cjs');
    } else if (checkPathExists(pathJoin(opt.cwd, '.eslintrc.json'))) {
      fileName = pathJoin(opt.cwd, '.eslintrc.json');
    } else {
      createFile('.eslintrc.json', JSON.stringify({}), { cwd: opt.cwd });
      loading.text = chalk.cyan('未找到Eslint配置文件,已新建Eslint配置文件');
      fileName = pathJoin(opt.cwd, '.eslintrc.json');
    }
    if (fileName.indexOf('.eslintrc.json') !== -1 || fileName.indexOf('.eslintrc') !== -1) {
      loading.text = chalk.cyan('正在读取Eslint配置文件');
      const data = readFileSync(fileName, 'utf8');
      const jsonData = JSON.parse(data);
      if (!jsonData.parserOptions) {
        jsonData.parserOptions = {
          project: ['tsconfig.json', 'tsconfig.*.json'],
        };
      } else if (!jsonData.parserOptions.project) {
        jsonData.parserOptions.project = ['tsconfig.json', 'tsconfig.*.json'];
      }
      if (!jsonData.extends) {
        jsonData.extends = [];
      } else if (!Array.isArray(jsonData.extends)) {
        jsonData.extends = [jsonData.extends];
      }
      loading.stop();
      const { type } = await inquirer.prompt([
        {
          type: 'list',
          name: 'type',
          message: '请选择您的项目类型',
          choices: [
            { name: 'Next', value: '@compass-aiden/eslint-config/next' },
            { name: 'Vue', value: '@compass-aiden/eslint-config/vue' },
            { name: 'React', value: '@compass-aiden/eslint-config/react' },
            { name: 'Typescript', value: '@compass-aiden/eslint-config/ts' },
            { name: 'Nest', value: '@compass-aiden/eslint-config/nest' },
            { name: 'Vue2', value: '@compass-aiden/eslint-config/vue2' },
            { name: 'Javascript', value: '@compass-aiden/eslint-config/js' },
          ],
        },
      ]);
      if (!jsonData.extends.includes(type)) {
        jsonData.extends.push(type);
        loading.start(chalk.cyan('写入Eslint配置文件'));
        writeFileSync(fileName, JSON.stringify(jsonData, null, 2), 'utf8');
        Logger.warning(`Modified ${fileName}`);
      }
      loading.succeed('Eslint 插件安装成功');
    } else if (fileName.indexOf('.eslintrc.js') !== -1 || fileName.indexOf('.eslintrc.cjs') !== -1) {
      // 读取文件,并修改字段
      console.log(fileName);
    }
  }

  return {
    addEslintPlugin,
  };
}
