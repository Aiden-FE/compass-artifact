module.exports = {
  overrides: [
    {
      files: ['*.html'],
      // parser: '@angular-eslint/template-parser',
      // plugins: ['@angular-eslint/template'],
      extends: ['plugin:@angular-eslint/template/recommended'],
      rules: {
        /**
         * Any template/HTML related rules you wish to use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         */
      },
    },
    {
      files: ['*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['eslint-config-airbnb-base', 'eslint-config-airbnb-typescript/base']
        .map(require.resolve)
        .concat([
          'plugin:@angular-eslint/recommended',
          // This is required if you use inline templates in Components
          'plugin:@angular-eslint/template/process-inline-templates',
        ])
        .concat(['./recommended-base.js'].map(require.resolve)),
      rules: {
        /**
         * Any TypeScript source code (NOT TEMPLATE) related rules you wish to
         * use/reconfigure over and above the
         * recommended set provided by the @angular-eslint project would go here.
         */
        '@angular-eslint/directive-selector': ['error', { type: 'attribute', prefix: 'app', style: 'camelCase' }],
        '@angular-eslint/component-selector': ['error', { type: 'element', prefix: 'app', style: 'kebab-case' }],
      },
    },
    {
      files: ['*.{spec,e2e-spec}.ts', 'protractor.conf.js'],
      env: {
        jasmine: true,
        node: true,
      },
    },
  ],
};
