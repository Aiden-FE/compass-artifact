import { readFileSync, writeFileSync } from 'fs';
import childProcess from 'child_process';
import chalk from 'chalk';
import inquirer from 'inquirer';
import * as acorn from 'acorn';
import * as acornWalk from 'acorn-walk';
import * as astring from 'astring';
import { checkPathExists, createFile, getASTTreeOfFile, pathJoin, scanNpmManager } from '~/utils';
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
      if (jsonData[key] === undefined) {
        jsonData[key] = PRESET_PRETTIERRC[key];
        isModified = true;
      }
    });
    if (!isCreated && isModified) {
      printLog.push(chalk.yellow(`Modified ${configFilePath}`));
    }
    writeFileSync(configFilePath, JSON.stringify(jsonData, null, 2), 'utf8');
    loading.pause();
    const { isAddEslint } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'isAddEslint',
        message: '您是否需要添加Eslint相关配置?',
        default: false,
      },
    ]);
    loading.resume(chalk.cyan('安装依赖项'));
    const devDeps = isAddEslint ? 'prettier eslint-config-prettier eslint-plugin-prettier' : 'prettier';
    try {
      // 安装依赖
      childProcess.execSync(`${this.option.manager} add -D ${devDeps}`, {
        cwd: this.option.cwd,
        stdio: 'inherit',
      });
      printLog.push(chalk.yellow(`Installed devDependencies ${devDeps}`));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(`\n${printLog.join('\n')}`);
      // eslint-disable-next-line no-console
      console.error(err);
      loading.fail(`安装依赖失败,您可以手动安装后面这些依赖或修复错误后再次重试, ${devDeps}`);
      return;
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
    }
    if (!isAddEslint) {
      if (isModifiedPkg) {
        writeFileSync(pkgFilePath, JSON.stringify(pkgData, null, 2), 'utf8');
        printLog.push(chalk.yellow(`Modified ${pkgFilePath}`));
      }
      // eslint-disable-next-line no-console
      console.log(`\n${printLog.join('\n')}`);
      loading.succeed(chalk.green('Prettier 插件安装成功'));
      return;
    }
    loading.text = chalk.cyan('开始处理Eslint相关配置项');
    const ESLINT_EXTEND = 'plugin:prettier/recommended';
    if (pkgData.eslintConfig) {
      if (!pkgData.eslintConfig.extends) {
        pkgData.eslintConfig.extends = [];
      }
      if (!Array.isArray(pkgData.eslintConfig.extends)) {
        pkgData.eslintConfig.extends = [pkgData.eslintConfig.extends];
      }
      if (!pkgData.eslintConfig.extends.includes(ESLINT_EXTEND)) {
        pkgData.eslintConfig.extends.push(ESLINT_EXTEND);
        isModifiedPkg = true;
      }
      if (isModifiedPkg) {
        writeFileSync(pkgFilePath, JSON.stringify(pkgData, null, 2), 'utf8');
        printLog.push(chalk.yellow(`Modified ${pkgFilePath}`));
      }
      // eslint-disable-next-line no-console
      console.log(`\n${printLog.join('\n')}`);
      loading.succeed(chalk.green('Prettier 插件安装成功'));
      return;
    }
    if (isModifiedPkg) {
      writeFileSync(pkgFilePath, JSON.stringify(pkgData, null, 2), 'utf8');
      printLog.push(chalk.yellow(`Modified ${pkgFilePath}`));
    }
    const eslintConfigPath = pathJoin(this.option.cwd, '.eslintrc.json');
    const eslintConfigJsPath = pathJoin(this.option.cwd, '.eslintrc.js');
    const eslintConfigCjsPath = pathJoin(this.option.cwd, '.eslintrc.cjs');
    if (checkPathExists(eslintConfigPath)) {
      const eslintJsonData = JSON.parse(readFileSync(eslintConfigPath, 'utf8'));
      if (!eslintJsonData.extends) {
        eslintJsonData.extends = [];
      }
      if (Array.isArray(eslintJsonData.extends)) {
        eslintJsonData.extends = [eslintJsonData.extends];
      }
      if (!eslintJsonData.extends.includes(ESLINT_EXTEND)) {
        eslintJsonData.extends.push(ESLINT_EXTEND);
        writeFileSync(eslintConfigPath, JSON.stringify(eslintJsonData, null, 2), 'utf8');
        printLog.push(chalk.yellow(`Modified ${eslintConfigPath}`));
      }
    } else if (checkPathExists(eslintConfigJsPath) || checkPathExists(eslintConfigCjsPath)) {
      let ast: any;
      let isJSFile: boolean = false;
      if (checkPathExists(eslintConfigJsPath)) {
        ast = getASTTreeOfFile(eslintConfigJsPath, { cwd: this.option.cwd });
        isJSFile = true;
      } else {
        ast = getASTTreeOfFile(eslintConfigCjsPath, { cwd: this.option.cwd });
        isJSFile = false;
      }
      // 找到module.exports对象
      const exportsAssignment: any = ast.body.find(
        (node: any) =>
          node.type === 'ExpressionStatement' &&
          node.expression.type === 'AssignmentExpression' &&
          node.expression.left.object.name === 'module' &&
          node.expression.left.property.name === 'exports',
      );
      let extendsNode: acorn.Property | undefined;
      // 找到extends节点,如果是string节点则转为数组节点
      acornWalk.ancestor(exportsAssignment.expression.right, {
        Property: (node, ancestors: any[]) => {
          if (
            (node.key.type === 'Identifier' && node.key.name === 'extends') ||
            (node.key.type === 'Identifier' && node.key.name === '"extends"') ||
            (node.key.type === 'Identifier' && node.key.name === "'extends'") ||
            (node.key.type === 'Literal' && node.key.value === 'extends') ||
            (node.key.type === 'Literal' && node.key.value === "'extends'") ||
            (node.key.type === 'Literal' && node.key.value === '"extends"')
          ) {
            if (node.value.type === 'ArrayExpression') {
              extendsNode = node as acorn.Property;
            }
            if (node.value.type === 'Literal') {
              const index = ancestors[ancestors.length - 2].properties.findIndex((n: any) => n === node);
              if (index !== -1) {
                const extendsAST: acorn.ObjectExpression = acorn.parseExpressionAt(
                  `{ extends: [${node.value.raw}] }`,
                  0,
                  {
                    ecmaVersion: 7,
                  },
                ) as acorn.ObjectExpression;
                ancestors[0].properties.splice(index, 1, extendsAST.properties[0]);
                extendsNode = extendsAST.properties[0] as acorn.Property;
              }
            }
          }
        },
      });
      // 未找到则新建节点
      if (!extendsNode) {
        const extendsAST: acorn.ObjectExpression = acorn.parseExpressionAt('{ extends: [] }', 0, {
          ecmaVersion: 7,
        }) as acorn.ObjectExpression;
        extendsNode = extendsAST.properties[0] as acorn.Property;
        exportsAssignment.expression.right.properties.push(extendsNode);
      }
      // 当不存在 ESLINT_EXTEND 的值时则开始写入,存在则不处理
      if (
        extendsNode.value.type === 'ArrayExpression' &&
        !extendsNode.value.elements.find((el) => el?.type === 'Literal' && el.value === ESLINT_EXTEND)
      ) {
        extendsNode.value.elements.push({
          type: 'Literal',
          value: ESLINT_EXTEND,
          raw: `'${ESLINT_EXTEND}'`,
        } as acorn.Literal);
        writeFileSync(isJSFile ? eslintConfigJsPath : eslintConfigCjsPath, astring.generate(ast, { comments: true }), {
          encoding: 'utf8',
        });
        printLog.push(chalk.yellow(`Modified ${isJSFile ? eslintConfigJsPath : eslintConfigCjsPath}`));
      }
    } else {
      printLog.push(
        chalk.yellow('未找到Eslint配置文件,您可以手动在eslint配置文件的extends中加入 "plugin:prettier/recommended"'),
      );
    }
    // eslint-disable-next-line no-console
    console.log(`\n${printLog.join('\n')}`);
    loading.succeed(chalk.green('Prettier 插件安装成功'));
  }
}
