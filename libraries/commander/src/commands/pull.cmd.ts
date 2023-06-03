import { Command } from 'commander';
import ora from 'ora';
import { downloadRepoFromGithub } from '~/utils';
import { Logger } from '~/services';

export default (program: Command) => {
  program
    .command('pull')
    .argument('author', '存储库归属的作者名')
    .argument('repository_name', '存储库的名称')
    .option('-B, --branch <branch>', '拉取的目标分支名,默认为主分支')
    .option('-P, --path <path>', '拉取目标仓库的特定路径,默认为仓库根路径')
    .option('-T, --token <token>', '授权的鉴权信息')
    .option('-O, --output <output>', '输出文件的路径,默认为当前路径', './')
    .description('拉取远程存储库')
    .action(async (author, repository, option) => {
      const loading = ora();
      loading.start(Logger.info('正在拉取模板', false));
      try {
        await downloadRepoFromGithub(
          {
            author,
            repository,
            repoPath: option.path,
            branch: option.branch,
          },
          option.output || './',
          option.token,
        );
        loading.succeed(Logger.success('模板拉取完成', false));
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log(e);
        loading.fail(Logger.error('模板拉取失败', false));
      }
    });
};
