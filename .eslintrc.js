module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
                '@stylistic/ts/indent': [
                    'error',
                    4
                ],
                '@stylistic/ts/quotes': [
                    'error',
                    'single',
                    {
                        'avoidEscape': true
                    }
                ],
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    {
                        'args': 'all',
                        'argsIgnorePattern': '^_',
                        'caughtErrors': 'all',
                        'caughtErrorsIgnorePattern': '^_',
                        'destructuredArrayIgnorePattern': '^_',
                        'varsIgnorePattern': '^_',
                        'ignoreRestSiblings': true
                    }
                ],
                'no-restricted-syntax': 'off',
                'no-console': 'warn',
                '@stylistic/ts/member-delimiter-style': [
                    'error',
                    {
                        'multiline': {
                            'delimiter': 'semi',
                            'requireLast': true
                        },
                        'singleline': {
                            'delimiter': 'semi',
                            'requireLast': true
                        }
                    }
                ],
  }
}
