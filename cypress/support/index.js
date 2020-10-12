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
//import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')
import './commands';
require('cypress-xpath');
const moment = require('moment');
const addContext = require('mochawesome/addContext');

// Alternatively you can use CommonJS syntax:
// require('./commands')

beforeEach(function () {
  cy.log('Test run started on : ' + new moment().format('DD-MM-YYYY HH:mm:ss'));
})

//Runs after a test completes
Cypress.on('test:after:run', (test, runnable) => {

  cy.log('Test run ended on : ' + new moment().format('DD-MM-YYYY HH:mm:ss'));

  const spec_title = runnable.parent.title;

  console.log("spec_title :", spec_title);
  console.log("test.state  :", test.state);
  console.log("Cypress.spec.name  :", Cypress.spec.name);
  console.log("test.title  :", test.title);
  console.log(" window.testState :", window.testState);

  let scenarioName = window.testState.currentScenario.name;
  let stepResult = window.testState.stepResults;

  window.testState.scenarioSteps[scenarioName].forEach(function(currStep,index){ 
    console.log("window.testState.scenarioSteps[scenarioName]",stepResult[index].status); 
    addContext({ test }, {
      title: currStep.keyword + " " +  currStep.text,
      value: stepResult[index].status + " " + stepResult[index].duration
    })
  });

  if (test.state === 'failed' || test.state === 'passed') {
    addContext({ test }, {
      title: 'Test Run Video: ' + '>> videos/' + Cypress.spec.name + '.mp4',
      value: 'videos/' + Cypress.spec.name + '.mp4'
    })
  }

  if (test.state === 'failed') {
    addContext({ test }, {
      title: 'Failing Screenshot: ' + '>> screenshots/' + Cypress.spec.name + '/' + spec_title + ' -- ' + test.title + ' (failed)' + '.png <<',
      value: 'screenshots/' + Cypress.spec.name + '/' + spec_title + ' -- ' + test.title + ' (failed)' + '.png'
    })
  }
});