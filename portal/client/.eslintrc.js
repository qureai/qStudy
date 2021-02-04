const path = require('path')

module.exports = {
  'extends': ['airbnb', 'prettier', 'prettier/react'],
  'plugins': ['prettier'],
  'rules': {
    'react/jsx-filename-extension': [
      1,
      {
        'extensions': ['.js', '.jsx']
      }
    ],
    'no-underscore-dangle': 0,
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'react/forbid-prop-types': 1,
    'react/jsx-props-no-spreading': 1,
    'react/no-unused-state': 1,
    'no-console': 2,
    'import/no-cycle' : 0,
    'consistent-return' : 0
  },
  'globals': {
    'window': true,
    'document': true,
    'localStorage': true,
    'FormData': true,
    'FileReader': true,
    'Blob': true,
    'File': true,
    'navigator': true,
    'Headers': true,
    'Request': true,
    'fetch': true,
    'Image': true,
  },
  'parser': 'babel-eslint',
  'settings': {
    'import/resolver': {
      'alias': {
        'map': [
          ['@', path.resolve(__dirname, 'src')],
          ['react', path.resolve(__dirname, './node_modules/react')],
          ['states', path.resolve(__dirname, './src/states')],
          ['components', path.resolve(__dirname, './src/components')],
          ['containers', path.resolve(__dirname, './src/containers')],
          ['scss', path.resolve(__dirname, './src/scss')],
          ['libs', path.resolve(__dirname, './src/libs')]
        ]
      }
    }
  }
}
