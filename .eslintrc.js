module.exports = {
  extends: 'airbnb-base',
  rules: {
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: false }], 
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],   
  }
};