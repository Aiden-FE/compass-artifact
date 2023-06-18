module.exports = {
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-unused-vars': [1, { args: 'after-used', argsIgnorePattern: '^_' }],
    'import/extensions': 'off',
  },
};
