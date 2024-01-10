import { execSync } from 'child_process';
import { type Command } from 'commander';
import ora from 'ora';
import inquirer from 'inquirer';
import { ConvertArrayToUnion } from '~/interfaces';
import { Logger, Prettier, useEslintService, useNextService } from '~/services';
import { pathJoin, scanNpmManager } from '~/utils';

const G_TYPE = [
  /** 创建Vue项目 */
  'vue' as const,
  /** 创建Next项目 */
  'next' as const,
  /** 创建React项目 */
  'react' as const,
  /** 添加Eslint插件 */
  'eslint' as const,
  /** 添加Prettier插件 */
  'prettier' as const,
];

export interface GCommandOption {
  manager?: 'npm' | 'pnpm' | 'yarn';
  cwd?: string;
}

async function createReactProject(option: Required<GCommandOption>) {
  const loading = ora();
  const { template } = await inquirer.prompt([
    {
      type: 'list',
      name: 'template',
      message: '请选择模板',
      default: 'react-ts',
      choices: [
        {
          name: 'React Typescript',
          value: 'react-ts',
        },
        {
          name: 'React',
          value: 'react',
        },
      ],
    },
  ]);
  loading.start(Logger.info('正在通过 create vite@latest 创建React模板', false));
  try {
    switch (option.manager) {
      case 'pnpm':
        execSync(`pnpm create vite@latest --template ${template}`, { stdio: 'inherit' });
        break;
      case 'yarn':
      case 'npm':
      default:
        execSync(`npm create vite@latest --template ${template}`, { stdio: 'inherit' });
        break;
    }
    loading.succeed(Logger.success('创建 React 项目成功', false));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    loading.fail(Logger.error('创建 React 项目失败', false));
  }
}

function createVueProject(option: Required<GCommandOption>) {
  const loading = ora();
  loading.start(Logger.info('正在通过 create vue@latest 创建模板', false));
  try {
    switch (option.manager) {
      case 'pnpm':
        execSync('pnpm create vue@latest', { stdio: 'inherit' });
        break;
      case 'yarn':
      case 'npm':
      default:
        execSync('npm create vue@latest', { stdio: 'inherit' });
        break;
    }
    loading.succeed(Logger.success('创建 Vue 项目成功', false));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    loading.fail(Logger.error('创建 Vue 项目失败', false));
  }
}

export default (program: Command) => {
  program
    .command('g')
    .description('生成插件或项目')
    .argument(
      'type',
      '生成的目标类型.\n- vue\t创建Vue3项目\n- next\t创建Next项目\n- eslint\t创建Eslint插件\n- prettier\t创建Prettier插件',
    )
    .option(
      '-M, --manager <manager>',
      '指定包管理器,未指定则读取执行路径下的lock文件来确定默认管理器\n- npm\n- pnpm\n- yarn',
    )
    .option('-C, --cwd <cwd>', '程序执行路径, 例如')
    .action(async (type: ConvertArrayToUnion<typeof G_TYPE>, option: GCommandOption) => {
      const opt = {
        manager: option.manager || 'npm',
        cwd: process.cwd(),
      };
      if (option.cwd) {
        opt.cwd = option.cwd.startsWith('/') ? option.cwd : pathJoin(process.cwd(), option.cwd);
      }
      if (!option.manager) {
        opt.manager = scanNpmManager({ cwd: opt.cwd });
      }
      if (type === 'next') {
        const { createNextProject } = useNextService(opt);
        await createNextProject();
      }
      if (type === 'vue') {
        createVueProject(opt);
      }
      if (type === 'react') {
        await createReactProject(opt);
      }
      if (type === 'eslint') {
        const { addEslintPlugin } = useEslintService(opt);
        await addEslintPlugin();
      }
      if (type === 'prettier') {
        const prettierInstance = new Prettier(opt);
        await prettierInstance.addPrettierPlugin();
      }
    });
};
