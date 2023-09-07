import { writeFileSync } from 'fs';
import process from 'process';
import { execSync } from 'child_process';
import { checkPathExists, pathJoin, requireModule } from '~/utils';
import { Logger } from '~/services';

export default function addEslintPlugin(path = './', manage = 'pnpm') {
  const eslintFilePath = pathJoin(process.cwd(), path, '.eslintrc.js');
  const isExists = checkPathExists(eslintFilePath);
  if (!isExists) {
    throw new Error('未找到Eslint配置文件');
  }
  const config = requireModule(eslintFilePath);
  delete config.parser;
  delete config.plugins;
  delete config.rules;
  config.parserOptions = {
    project: 'tsconfig.json',
  };
  config.extends = ['@compass-aiden/eslint-config/nest'];
  writeFileSync(eslintFilePath, `module.exports = ${JSON.stringify(config, null, 2)}\n`);
  execSync(
    `${manage} i -D @compass-aiden/eslint-config eslint-config-airbnb-base eslint-config-airbnb-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser`,
    { stdio: 'inherit', cwd: pathJoin(process.cwd(), path) },
  );
  Logger.success('Eslint 插件安装成功');
}
