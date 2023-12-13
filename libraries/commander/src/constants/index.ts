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

/** ESlint 插件 */
export const ESLINT_PLUGINS = [
  {
    name: 'Next',
    value: '@compass-aiden/eslint-config/next',
    deps: [
      'eslint-config-next',
      'eslint-config-airbnb',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'eslint-config-airbnb-typescript',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint-plugin-react-refresh',
    ],
    lint: 'eslint . --fix --ext .js,.jsx,.ts,.tsx',
  },
  {
    name: 'Vue',
    value: '@compass-aiden/eslint-config/vue',
    deps: ['eslint-plugin-vue', '@typescript-eslint/parser', '@vue/eslint-config-airbnb-with-typescript'],
    lint: 'eslint . --fix --ext .js,.jsx,.ts,.tsx,.vue',
  },
  {
    name: 'React',
    value: '@compass-aiden/eslint-config/react',
    deps: [
      'eslint-config-airbnb',
      'eslint-plugin-jsx-a11y',
      'eslint-plugin-react',
      'eslint-plugin-react-hooks',
      'eslint-config-airbnb-typescript',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
      'eslint-plugin-react-refresh',
    ],
    lint: 'eslint . --fix --ext .js,.jsx,.ts,.tsx',
  },
  {
    name: 'Typescript',
    value: '@compass-aiden/eslint-config/ts',
    deps: [
      'eslint-config-airbnb-base',
      'eslint-config-airbnb-typescript',
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
    ],
    lint: 'eslint . --fix --ext .js,.jsx,.ts,.tsx',
  },
  {
    name: 'Nest',
    value: '@compass-aiden/eslint-config/nest',
    deps: [
      'eslint-config-airbnb-base',
      'eslint-config-airbnb-typescript',
      '@typescript-eslint/eslint-plugin',
      '@typescript-eslint/parser',
    ],
    lint: 'eslint . --fix --ext .js,.jsx,.ts,.tsx',
  },
  {
    name: 'Vue2',
    value: '@compass-aiden/eslint-config/vue2',
    deps: ['eslint-plugin-vue', '@vue/eslint-config-airbnb-with-typescript'],
    lint: 'eslint . --fix --ext .js,.jsx,.ts,.tsx,.vue',
  },
  {
    name: 'Javascript',
    value: '@compass-aiden/eslint-config/js',
    deps: ['eslint-config-airbnb-base'],
    lint: 'eslint . --fix --ext .js,.jsx,.ts,.tsx',
  },
];
