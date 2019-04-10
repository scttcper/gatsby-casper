module.exports = {
  root: true,
  env: {
    node: true,
    jest: true,
  },
  extends: ['xo-space/esnext', 'xo-react/space', 'xo-typescript', 'prettier/@typescript-eslint'],
  rules: {
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/indent': ['error', 2, { SwitchCase: 1 }],
    '@typescript-eslint/explicit-function-return-type': 0,
    'capitalized-comments': 0,
    'comma-dangle': ['error', 'always-multiline'],
    'react/jsx-tag-spacing': 0,
    'react/prop-types': 0,
    'no-warning-comments': 0,
    'complexity': 0,
  },
};
