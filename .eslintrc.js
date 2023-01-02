module.exports = {
  root: true,
  env: {
    es2022: true,
    browser: true,
    node: true,
  },
  extends: ['semistandard', 'plugin:sonarjs/recommended', 'plugin:promise/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'global-require': 'off',
    'no-restricted-exports': 'off',
    'no-console': 'off',
    'sonarjs/no-duplicate-string': 'off',
    'func-names': 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
  plugins: ['only-warn', 'import', 'sonarjs', 'promise'],
};
