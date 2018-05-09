// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['eslint:recommended'],
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  'globals': {
    $: true,
    'Axios': true
  },
  // add your custom rules here
  rules: {
    'comma-dangle': 0,
    'eqeqeq': 1,
    'no-script-url': 1,
    'no-plusplus': 0,
    'no-new': 0,
    'no-console': 0,
    'prefer-rest-params': 1,
    //'no-undef':0,
    'camelcase': [2, { 'properties': 'never' }],
    //'indent': [ 'error', 2 ],
    'no-mixed-spaces-and-tabs':0,
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
