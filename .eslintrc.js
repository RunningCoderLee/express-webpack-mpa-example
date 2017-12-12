module.exports = {
  extends: 'airbnb-base',
  rules: {
    'import/no-unresolved': ['error', { commonjs: true, caseSensitive: false }], 
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],  
    'max-len': ['error', 100, 2, {
      ignoreUrls: true,
      ignoreComments: true,
      ignoreRegExpLiterals: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
    }], 
  }
};