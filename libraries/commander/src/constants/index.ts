import { SelectionTemplate } from '~/interfaces';

export const PRESET_TEMPLATES_CONFIG_URL =
  'https://aidenoss.cpolar.cn/compass-open/configuration/preset-templates.json';

export const CUSTOM_TEMPLATE: SelectionTemplate = {
  name: 'custom',
  description: '自定义Github远程存储库模板',
  choices: [
    {
      type: 'input',
      name: 'author',
      message: '请输入存储库作者名',
      validate: (input: string) => !!input || '必须提供存储库归属作者名',
    },
    {
      type: 'input',
      name: 'repository',
      message: '请输入存储库名',
      validate: (input: string) => !!input || '必须提供存储库名',
    },
    {
      type: 'input',
      name: 'branch',
      default: undefined,
      message: '[可选] 请输入所需拉取的存储库分支,默认选择存储库主分支',
    },
    {
      type: 'input',
      name: 'repoPath',
      default: undefined,
      message: '[可选] 可输入存储库内的子路径拉取指定目录,默认根目录获取所有',
    },
  ],
};
