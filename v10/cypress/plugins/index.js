/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */
 const fs = require('fs-extra');
 const pg = require("pg");
 const path = require('path');
 const cucumber = require('cypress-cucumber-preprocessor').default;
 
 module.exports = (on, config) => {
   on('file:preprocessor', cucumber());
 
   //also logs cy.log commands into console
   on('task', {
     LOGGER ({message, value }) {
       if(value){
         console.log('[Cypress-TestFramework]', message, value);
       } else{
         console.log('[Cypress-TestFramework]', message);
       }
       return null
     }
   });
 
   //Connects to an env db and fetches query result
   on("task", {
     DATABASE ({ dbConfig, sql, values }) {
       // const pool = new pg.Pool(config.db);
       const pool = new pg.Pool(dbConfig);
       try {
           return pool.query(sql, values)
       } catch (e) {
       }
     }
   });
 
   // `on` is used to hook into various events Cypress emits
   // `config` is the resolved Cypress config
     
   function getConfigurationByFile(file) {
       const pathToConfigFile = path.resolve("cypress/config", `${file}.json`);
 
       return fs.readJson(pathToConfigFile);
   }
   //if no environment is provided, then PR env will be default
   const file = config.env.configFile || "qa";
 
   return getConfigurationByFile(file);
 };