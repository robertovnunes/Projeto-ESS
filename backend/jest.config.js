module.exports = {

  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '',
  testRegex: '.steps.js$',
  transform: {
  
  '^.+\\.(t|j)s$': 'ts-jest',
  
  },
  
  setupFilesAfterEnv: ['./setupTests.js'],
  
  };