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
const addContext = require('mochawesome/addContext')
require('@cypress/xpath');

//runs only once before All the tests
before(function () {
  cy.log('Test run started on : ' + new moment().format('DD-MM-YYYY HH:mm:ss'));
  cy.clearState();
})

//runs once before each feature
beforeEach(function () {
  console.log("Executing beforeEach"); 
  cy.log('Test Execution started on : ' + new moment().format('DD-MM-YYYY HH:mm:ss'));
})

//runs once after each feature
afterEach(function () {
  console.log("Executing afterEach"); 
  cy.log('Test Execution ended on : ' + new moment().format('DD-MM-YYYY HH:mm:ss'));

})

//runs once before each test
Cypress.on('test:before:run', (test, runnable) => {
  console.log('before:run');
})

function getTags(tagData){
  let tagList =[]
  tagData.forEach(tag => {
    tagList.push(tag.name)
  })
  return tagList;
}

//Runs before a test run starts
Cypress.on('before:run', (details) => {
  if (details.specs && details.browser) {
    // details.specs and details.browser will be undefined in interactive mode
    cy.log('Running', details.specs.length, 'specs in', details.browser.name)}
})

//Runs after a test run completes
Cypress.on('test:after:run', (test, runnable) => {
  cy.log('Feature execution run ended on : ' + new moment().format('DD-MM-YYYY HH:mm:ss'));

  const spec_title = runnable.parent.title;
  console.log("[Spec] :", Cypress.spec);
  console.log("[Runnable Name] :", runnable);
  console.log("[Test] :", test);
  console.log("[Tags] :", getTags(window.testState.gherkinDocument.feature.tags));
  console.log("[Cypress env config] :", Cypress.env());
  console.log("[Cypress config] :", Cypress.config());
  console.log("[Feature Filename] :", Cypress.spec.name);
  console.log("[Scenario Name] :", spec_title);
  console.log("[Test Status] :", test.state);

  // console.log("[window] :", window);
  // console.log("[window.testState] :", window.testState);
  console.log("[Failed Step \u274c] :",  window.testState.pickleStep);

  //Assumption: pickleStep contains usually the failed step number or last step
  let failedStep = window.testState.pickleStep;

  window.testState.pickle.steps.forEach(function(currStep,index){ 

    currStep.index = index;

    if(currStep.id !== failedStep.id) {
  
      if(failedStep.index  &&  currStep.index > failedStep.index){
        currStep.status = "skipped";
        console.log(".. :  ", currStep.text); 

      }else {
        currStep.status = "pass";
        console.log(" \u2714 : ", currStep.text); 

      }
      
    } else {
      currStep.status = "failed";
      failedStep.index = index;
      console.log("\u274c : ", currStep.text); 
    } 

    addContext({ test }, {
      title: currStep.text,
      value: currStep.status
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
  console.log("Executing afterAll");
  cy.log('Test run finished on : ' + new moment().format('DD-MM-YYYY HH:mm:ss'));
})

