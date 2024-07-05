module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  rootDir: './',
  testRegex: '.steps.js$',
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
  setupFilesAfterEnv: ['./setupTests.js'],
};

