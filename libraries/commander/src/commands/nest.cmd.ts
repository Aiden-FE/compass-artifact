import { Command } from 'commander';
import { Logger } from '~/services';
import { execSync } from 'child_process';
import * as process from 'process';
import inquirer from 'inquirer';
import addEslintPlugin from '../utils/add-eslint.plugin';
import addPrettierPlugin from '../utils/add-prettier.plugin';

interface INestCMDOption {
  pkgManager: string;
  addPlugin?: string;
  create?: string;
}

function createNest(option: INestCMDOption) {
  execSync(`npx @nestjs/cli new ${option.create}`, { stdio: 'inherit' });
}

async function addPlugin(option: INestCMDOption) {
  const opts = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'plugins',
      message: '请选择要添加的插件',
      choices: [
        { name: 'Eslint 代码质量检查', value: 'eslint' },
        { name: 'Prettier 代码格式化', value: 'prettier' },
      ],
    },
  ]);
  if (opts.plugins.includes('eslint')) {
    addEslintPlugin(option.addPlugin, option.pkgManager);
  }
  if (opts.plugins.includes('prettier')) {
    addPrettierPlugin(option.addPlugin, option.pkgManager);
  }
}

export default (program: Command) => {
  program
    .command('nest')
    .description('Nest相关脚手架命令')
    .option('-C, --create <project_path>', '创建项目')
    .option('-M, --pkgManager <pnpm>', '使用的脚手架', 'pnpm')
    .option('-P, --addPlugin <project_path>', '为项目添加插件', process.cwd())
    .action(async (option: INestCMDOption) => {
      Logger.debug('检查Nest命令是否存在');
      if (!['pnpm', 'yarn', 'npm'].includes(option.pkgManager)) {
        throw new Error('包管理工具请使用pnpm, yarn, npm之一');
      }
      if (option.create) {
        createNest(option);
        return;
      }
      if (option.addPlugin) {
        await addPlugin(option);
      }
    });
};
