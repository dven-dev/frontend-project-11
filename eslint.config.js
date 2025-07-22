import js from '@stylistic/eslint-plugin-js'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: {
      js,
    },
    rules: {
      ...js.configs['flat/recommended']?.rules,
      'no-console': 'off',
    },
  },
]
