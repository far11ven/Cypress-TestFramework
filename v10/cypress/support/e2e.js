// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// Alternatively you can use CommonJS syntax:
// require('./commands')

import './commands'
const moment = require('moment')
const addContext = require('mochawesome/addContext');

//runs only once before All the tests
before(function () {
  cy.log('Test run started on : ' + new moment().format('DD-MM-YYYY HH:mm:ss'));
  cy.clearState();
})

//runs once before each test
beforeEach(function () {
  console.log("beforeEach"); 
  cy.clearTempState();
})

//runs once before each test
Cypress.on('test:before:run', (test, runnable) => {
  //cy.clearTempState();
})

//Runs after a test run completes
Cypress.on('test:after:run', (test, runnable) => {
  cy.log('Test run ended on : ' + new moment().format('DD-MM-YYYY HH:mm:ss'));

  const spec_title = runnable.parent.title;
  console.log("tag Name :", Cypress.spec);
  console.log("runnable Name :", runnable);
  console.log("test Name :", test);
  console.log("Cypress tags :", Cypress.env("env"));
  console.log("Cypress env Name :", Cypress.env);
  console.log("Cypress config :", Cypress.config());
  console.log("process.argv :", process.argv);
  console.log("Feature Name :", Cypress.spec.name);
  console.log("Scenario Name :", spec_title);
  console.log("Test Status :", test.state);

  let scenarioName = window.testState.currentScenario.name;
  let stepResult = window.testState.stepResults;

  window.testState.scenarioSteps[scenarioName].forEach(function(currStep,index){ 
    if(stepResult[index].status.toUpperCase() === "PASSED" ) {
    console.log( stepResult[index].status + " \u2714 : ",currStep.keyword + currStep.text); 
    } else if(stepResult[index].status.toUpperCase() === "FAILED" ) {
    console.log( stepResult[index].status + " \u274c : ",currStep.keyword + currStep.text); 
    } else {
      console.log( stepResult[index].status + " .. : ",currStep.keyword + currStep.text); 
    }
    addContext({ test }, {
      title: currStep.keyword + " " +  currStep.text,
      value: stepResult[index].status + " " + stepResult[index].duration
    })
  });

  if (test.state) {
    addContext({ test }, {
      title: 'Test Run Video: ' + '>> videos\\' + Cypress.spec.name + '.mp4',
      value: 'videos/' + Cypress.spec.name + '.mp4'
    })
  }

  //add screenshot to report after a failure
  if (test.state === 'failed') {
    addContext({ test }, {
      title: 'Failing Screenshot: ' + '>> screenshots\\' + Cypress.spec.name + '\\' + spec_title + ' -- ' + test.title + ' (failed)' + '.png <<',
      value: 'screenshots/' + Cypress.spec.name + '/' + spec_title + ' -- ' + test.title + ' (failed)' + '.png'
    })
  }
});

//runs only once after All the tests
after(function () {
  console.log("afterAll"); 
})

