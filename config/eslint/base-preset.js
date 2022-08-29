module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  plugins: ['prettier'],
  rules: {
    // 'prettier/prettier': 'error',
    'prettier/prettier': [
      'error',
      {
        // singleQuote: true,
        // parser: 'flow',
        semi: true,
        trailingComma: 'none',
        singleQuote: true,
        tabWidth: 2,
        printWidth: 80
      }
    ],
    'arrow-body-style': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    'no-console': ['warn', { allow: ['warn', 'error', 'debug', 'info'] }],
    'padded-blocks': ['error', 'never'],
    'prefer-arrow-callback': 'off'
  },
  overrides: [
    {
      files: ['*.js'],
      rules: {
        'no-undef': 'off'
      }
    }
  ]
};
