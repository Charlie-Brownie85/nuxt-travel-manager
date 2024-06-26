// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt({
  languageOptions: {
    globals: {
      context: true,
      jest: true,
    }
  },
  rules: {
    semi: [2, 'always'],
    indent: ['error', 2, { SwitchCase: 2 }],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-useless-return': 'warn',
    'no-useless-constructor': 0,
    'no-empty-function': 0,
    'no-shadow': 'off',
    'no-param-reassign': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/no-unused-vars': ['error'],
    'consistent-return': 'warn',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      2,
      {
        'newlines-between': 'always-and-inside-groups',
        groups: [
          'builtin',
          'external',
          [
            'internal',
            'parent',
            'sibling',
          ],
          'index',
        ],
      },
    ],
  },
});
