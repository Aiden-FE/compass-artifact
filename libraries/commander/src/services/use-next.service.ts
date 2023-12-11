import ora from 'ora';
import { execSync } from 'child_process';
import Logger from '~/services/logger.service';

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

export default function useNextService(option: UseNextCommonOption) {
  async function createNextProject() {
    const opt = {
      manager: 'npm',
      cwd: undefined,
      ...option,
    };
    const execOption = { stdio: 'inherit' as const, cwd: opt.cwd };
    const loading = ora();
    loading.start(Logger.info('正在通过 create-next-app@latest 创建Next项目', false));
    try {
      switch (opt.manager) {
        case 'pnpm':
          execSync('pnpm dlx create-next-app@latest', execOption);
          break;
        case 'yarn':
        case 'npm':
        default:
          execSync('npx create-next-app@latest', execOption);
          break;
      }
      loading.succeed(Logger.success('创建 Next 项目成功', false));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
      loading.fail(Logger.error('创建 Next 项目失败', false));
    }
  }

  return {
    createNextProject,
  };
}
