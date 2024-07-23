const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default;

module.exports = defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber());
      // implement node event listeners here
    },
    specPattern: 'cypress/e2e/step_definitions/*.feature',
    baseUrl: 'http://localhost:3000/',

    testIsolation: false
  },
});