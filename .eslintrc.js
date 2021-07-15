module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base'],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    semi: [2, 'never'],
    'arrow-parens': [2, 'as-needed', { requireForBlockBody: true }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        paths: ['src'],
      },
    },
  },
}
