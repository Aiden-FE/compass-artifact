import { Command } from 'commander';
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'module';
import * as child_process from 'child_process';
import { Logger } from '~/services';

// @ts-ignore
const nodeRequire = createRequire(import.meta.url);

export default (program: Command) => {
  program
    .command('publish')
    .description('执行发布流程')
    .argument('version', '发布版本,可以是v0.0.1或0.0.1')
    .option('-R, --root <root>', '项目根目录,默认为当前程序执行路径', process.cwd())
    .option('-T, --type <type>', '发布类型', 'npm')
    .option(
      '-S, --skips <skips>',
      "跳过特定发布步骤,多个跳过可通过','逗号分割.\n\t\t\t- version 跳过版本更新使用package内当前版本;\n\t\t\t- publish 跳过发布命令执行;",
    )
    .action(async (version, opts) => {
      const skips: ('version' | 'publish')[] = opts.skips?.split(',') || [];
      if (opts.type === 'npm') {
        const pkgPath = path.resolve(opts.root, './package.json');
        if (!skips.includes('version')) {
          Logger.info(`正在更新package.json内的version字段为${version}`);
          const pkg = nodeRequire(pkgPath);
          pkg.version = version.replace(/(^v)/, '');
          fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
        }
        if (!skips.includes('publish')) {
          Logger.info('正在执行发布命令');
          child_process.execSync('npm publish');
        }
      }
    });
};
