import { Command } from 'commander';
import inquirer from 'inquirer';
import ora from 'ora';
import { pick, isString } from 'lodash-es';
import * as path from 'node:path';
import TempFile from 'template-file';
import fs from 'node:fs';
import { Logger } from '~/services';
import { asyncTask, downloadRepoFromGithub } from '~/utils';
import { CustomTemplate, PresetTemplate, RepositoryInfo, SelectionTemplate } from '~/interfaces';
import { CUSTOM_TEMPLATE, PRESET_TEMPLATES_CONFIG_URL } from '~/constants';
import { getFile } from '~/http';

export default (program: Command) => {
  program
    .command('create')
    .description('创建一个新的工程')
    .argument('project_name', '工程名')
    .option('-T, --token <token>', '授权的鉴权信息')
    .option('-O, --output <output>', '输出文件的路径,默认为当前路径', './')
    .option('--templateURL <token>', '自定义远程模板地址,需要满足PresetTemplate[]类型约束')
    .action(async (projectName: string, opts) => {
      if (opts.templateURL && !opts.templateURL.startsWith('http')) {
        Logger.error('请提供正确的自定义远程模板地址');
        return;
      }
      const pullTempsLoading = ora();
      pullTempsLoading.start(Logger.info('正在拉取远程预置模板', false));
      let PRESET_TEMPLATES: SelectionTemplate[] = [CUSTOM_TEMPLATE];
      const [pullErr, presetTemplates] = await asyncTask(
        getFile(opts.templateURL || PRESET_TEMPLATES_CONFIG_URL, {}, 5000).json<SelectionTemplate[]>(),
      );
      if (pullErr) {
        pullTempsLoading.warn(Logger.warning('拉取远程预置模板失败,您可以使用自定义模板', false));
      } else if (presetTemplates) {
        pullTempsLoading.stop();
        PRESET_TEMPLATES = presetTemplates.concat(PRESET_TEMPLATES);
      }
      const { tempType } = await inquirer.prompt([
        {
          type: 'list',
          name: 'tempType',
          message: '选择初始模板',
          default: PRESET_TEMPLATES[0].name,
          choices: PRESET_TEMPLATES.map((temp) => ({
            name: temp.description,
            value: temp.name,
          })),
        },
      ]);
      const option = PRESET_TEMPLATES.find((item) => item.name === tempType);
      if (!option) {
        Logger.error('未能获取配置项');
        return;
      }
      let repoInfo: RepositoryInfo;
      let repoVars: Record<string, any> = {};
      const outputPath = path.join(opts.output || './', projectName);
      if (option.name === 'custom') {
        repoInfo = await inquirer.prompt((option as CustomTemplate).choices);
      } else {
        const presetTemp = option as PresetTemplate;
        repoInfo = pick(presetTemp, ['author', 'repository', 'branch', 'repoPath']);
        if (presetTemp.replaceFilesPath?.length && presetTemp.choices) {
          if (Array.isArray(presetTemp.choices)) {
            presetTemp.choices.forEach((choice) => {
              if (isString(choice.validate)) {
                // eslint-disable-next-line no-param-reassign,@typescript-eslint/no-implied-eval
                choice.validate = new Function(`return ${choice.validate}`)();
              }
            });
          }
          repoVars = await inquirer.prompt(presetTemp.choices);
          repoVars.name = repoVars.name || projectName;
          repoVars.description = repoVars.description || '';
        }
      }
      const loading = ora();
      loading.start(Logger.info('正在拉取模板', false));
      try {
        await downloadRepoFromGithub(repoInfo, outputPath, opts.token);
        const presetTemp = option as PresetTemplate;
        const promises: Promise<void>[] = [];
        if (presetTemp.replaceFilesPath?.length) {
          presetTemp.replaceFilesPath.forEach((p) => {
            const filePath = path.join(outputPath, p);
            promises.push(
              TempFile.renderFile(filePath, repoVars).then((contents) => fs.writeFileSync(filePath, contents)),
            );
          });
        }
        await Promise.all(promises);
        loading.succeed(Logger.success('模板拉取完成', false));
        Logger.info(`\ncd ${outputPath}\nnpm install`);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);
        loading.fail(Logger.error('模板拉取失败', false));
      }
    });
};
