import process from 'process';
import { writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { checkPathExists, pathJoin, requireModule } from '~/utils/tools';
import { Logger } from '~/services';

export default function addPrettierPlugin(path = './', manage = 'pnpm') {
  const prettierFilePath = pathJoin(process.cwd(), path, '.prettierrc');
  const isExists = checkPathExists(prettierFilePath);
  if (!isExists) {
    throw new Error('未找到Prettier配置文件');
  }
  writeFileSync(
    prettierFilePath,
    JSON.stringify(
      {
        printWidth: 120,
        tabWidth: 2,
        useTabs: false,
        semi: true,
        singleQuote: true,
        quoteProps: 'as-needed',
        jsxSingleQuote: false,
        trailingComma: 'all',
        bracketSpacing: true,
        bracketSameLine: false,
        arrowParens: 'always',
        endOfLine: 'lf',
      },
      null,
      2,
    ),
  );

  const eslintFilePath = pathJoin(process.cwd(), path, '.eslintrc.js');
  const isEslintExists = checkPathExists(eslintFilePath);
  if (isEslintExists) {
    const config = requireModule(eslintFilePath);
    if (!config.extends) {
      config.extends = [];
    }
    if (!config.extends.includes('plugin:prettier/recommended')) {
      config.extends.push('plugin:prettier/recommended');
    }
    writeFileSync(eslintFilePath, `module.exports = ${JSON.stringify(config, null, 2)}\n`);
  }

  execSync(`${manage} i -D prettier ${isEslintExists ? 'eslint-config-prettier eslint-plugin-prettier' : ''}`, {
    stdio: 'inherit',
    cwd: pathJoin(process.cwd(), path),
  });
  Logger.success('Prettier 插件安装成功');
}
