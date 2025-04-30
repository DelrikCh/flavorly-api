import js from '@eslint/js';
import eslintPluginNode from 'eslint-plugin-n';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        console: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        module: 'readonly',
        require: 'readonly',
      },
    },
    plugins: {
      node: eslintPluginNode,
      prettier: prettierPlugin,
    },
    rules: {
      'node/no-missing-import': 'error',
      'node/no-unsupported-features/es-syntax': 'off',
      'prettier/prettier': 'error',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      eqeqeq: ['error', 'always'],
      semi: ['error', 'always'],
    },
  },
];
