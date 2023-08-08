/** @type { import('stylelint').Config } */

const config = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-recommended-scss',
    'stylelint-config-css-modules',
  ],
  overrides: [
    {
      customSyntax: 'postcss-styled-syntax',
      files: [
        '**/*.js',
        '**/*.cjs',
        '**/*.mjs',
        '**/*.jsx',
        '**/*.ts',
        '**/*.tsx',
      ],
    },
  ],
  plugins: ['stylelint-order'],
  rules: {
    'no-descending-specificity': null, // - allow nested selectors
    'no-empty-source': null, // - allow files without any styles
    'order/order': ['custom-properties', 'declarations'],
  },
}

module.exports = config
