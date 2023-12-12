import { readFileSync, writeFileSync } from 'fs';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import * as astring from 'astring';
import { checkPathExists, pathJoin, createFile, getASTTreeOfFile } from '~/utils';
import { ESLINT_PLUGINS } from '~/constants';

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
    const printLog = [] as string[];
    let fileName = '';
    let isCreateEslintFile = false;
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
      fileName = pathJoin(opt.cwd, '.eslintrc.json');
      isCreateEslintFile = true;
      printLog.push(chalk.green(`Created ${fileName}`));
      loading.text = chalk.cyan('未找到Eslint配置文件,已新建Eslint配置文件');
    }
    loading.stop();
    const { type } = await inquirer.prompt([
      {
        type: 'list',
        name: 'type',
        message: '请选择您的项目类型',
        choices: ESLINT_PLUGINS,
      },
    ]);
    loading.start(chalk.cyan('开始写入Eslint配置文件'));
    if (fileName.endsWith('.eslintrc.json') || fileName.endsWith('.eslintrc')) {
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
      if (!jsonData.extends.includes(type)) {
        jsonData.extends.push(type);
        writeFileSync(fileName, JSON.stringify(jsonData, null, 2), 'utf8');
        if (!isCreateEslintFile) {
          printLog.push(chalk.yellow(`Modified ${fileName}`));
        }
      }
    } else if (fileName.endsWith('.eslintrc.js') || fileName.endsWith('.eslintrc.cjs')) {
      const ast = getASTTreeOfFile(fileName, { cwd: undefined });
      // 找到module.exports对象
      const exportsAssignment: any = ast.body.find(
        (node: any) =>
          node.type === 'ExpressionStatement' &&
          node.expression.type === 'AssignmentExpression' &&
          node.expression.left.object.name === 'module' &&
          node.expression.left.property.name === 'exports',
      );
      // 找到extends数组
      let extendsArray = exportsAssignment.expression.right.properties.find((prop: any) => prop.key.name === 'extends')
        ?.value.elements;
      if (!extendsArray) {
        extendsArray = [];
        exportsAssignment.expression.right.properties.push({
          type: 'Property',
          key: { type: 'Identifier', name: 'extends' },
          value: { type: 'ArrayExpression', elements: extendsArray },
          kind: 'init',
        });
      }
      if (!extendsArray.find((literal: any) => literal.value === type)) {
        extendsArray.push({
          type: 'Literal',
          value: type,
          raw: `'${type}'`,
        });
        writeFileSync(fileName, astring.generate(ast), { encoding: 'utf8' });
        if (!isCreateEslintFile) {
          printLog.push(chalk.yellow(`Modified ${fileName}`));
        }
      }
      // FIXME: 还需要处理 parserOptions.project
    }
    // FIXME: 处理package.json内的依赖与scripts命令
    console.log(`\n${printLog.join('\n')}`);
    loading.succeed('Eslint 插件安装成功');
  }

  return {
    addEslintPlugin,
  };
}
