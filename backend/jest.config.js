module.exports = {

  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '',
  testRegex: '.steps.js$',
  transform: {
  
  '^.+\\.(t|j)s$': 'babel-jest',
  
  },
  
  setupFilesAfterEnv: ['./setupTests.js'],
  
  };