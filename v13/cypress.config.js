const { defineConfig } = require('cypress')

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const createEsbuildPlugin = require("@badeball/cypress-cucumber-preprocessor/esbuild");

const fs = require('fs-extra');
const pg = require("pg");
const path = require('path');

module.exports = defineConfig({
  projectId: '2pw1r7',
  viewportWidth: 1920,
  viewportHeight: 1080,
  pageLoadTimeout: 60000,
  requestTimeout: 30000,
  responseTimeout: 60000,
  defaultCommandTimeout: 10000,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    DB: {
      user: 'myuser',
      host: '127.0.0.1',
      database: 'pokemon',
      password: 'pass',
      port: 32763,
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/features/**/*.{feature,features}',
    excludeSpecPattern: '**/pages/*,**/common/*',
    experimentalSessionAndOrigin: false,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    // setupNodeEvents(on, config) {
    //   return require('./cypress/plugins/index.js')(on, config)
    // },
    specPattern: 'cypress/e2e/**/features/**/*.{feature,features}',
    excludeSpecPattern: '**/pages/*,**/common/*',
    experimentalRunAllSpecs: true,

    // `on` is used to hook into various events Cypress emits
    // `config` is the resolved Cypress config
    async setupNodeEvents(on, config) {

      //also logs cy.log commands into console
      on('task', {
          LOGGER({
              message,
              value
          }) {
              if (value) {
                  console.log(`Cypress-TestFramework][${new Date().toISOString()}]`, message, value);
              } else {
                  console.log(`[Cypress-TestFramework][${new Date().toISOString()}]`, message);
              }
              return null
          }
      });

      //Connects to an env db and fetches query result
      on("task", {
          DATABASE({
              dbConfig,
              sql,
              values
          }) {
              // const pool = new pg.Pool(config.db);
              const pool = new pg.Pool(dbConfig);
              try {
                  return pool.query(sql, values)
              } catch (e) { }
          }
      });

      // get configuration from <name>.config.json
      function getConfigurationByFile(file) {
          const pathToEnvFile = path.resolve("cypress/config", `${file}.json`);

          return fs.readJson(pathToEnvFile);
      }

      //if no environment is provided, then default.json will be used
      const file = config.env.envFile || "default";

      config = await getConfigurationByFile(file).then(response => {
          let resolvedConfig = {
              ...config, ...response
          };

          return resolvedConfig;
      });

      //including cucumber
      await preprocessor.addCucumberPreprocessorPlugin(on, config);

      let bundler = createBundler({
        plugins: [createEsbuildPlugin.default(config)],
      })
      
      on("file:preprocessor", bundler);

      return config;

  }
}
})
