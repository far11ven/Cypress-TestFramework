var config = require('../../../config.json')
var configjs = require('../../../config')
const addContext = require('mochawesome/addContext');
import HomePage from '../pages/HomePage'

describe('My First Test', function () {

  const spec_title = this.title
  var homePage = new HomePage();
    
  Cypress.on('test:after:run', (test) => {

    if (test.state === 'failed') {
      addContext({ test }, {
        title: 'Failing Screenshot: ' + '>> screenshots/' + Cypress.spec.name + '/' + spec_title + ' -- ' + test.title + ' (failed)' + '.png <<',
        value: 'screenshots/' + Cypress.spec.name + '/' + spec_title + ' -- ' + test.title + ' (failed)' + '.png'
      })
    }
  });


  it('Navigate to HomePage1', function () {
    //alert(config.url);

    cy.visit(config.url);

    cy.title().should('eq', ' Test Store1')
    cy.title().should('eq', ' Test Store')
    homePage.clickAPILogTraceButton();



    //addContext(this, 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==')

    //cy.get('#twotabsearchtextbox').type('Superman')
    //cy.get('.nav-search-submit .nav-input').click()
    //cy.get('span.a-color-state').contains('Superman')
  })

  it('Navigate to HomePage2', function () {
    //alert(config.url);

    cy.visit(config.url);
    cy.title().should('eq', ' Test Store')
    homePage.clickAPILogTraceButton();
    

  })

  it('goto API Log Page1', function () {
    //alert(config.url);

    cy.visit(config.url);
    cy.title().should('eq', ' Test Store')
    homePage.clickGearIcon();
    cy.title().should('eq', ' Test Store1')
    

    //addContext(this, 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==')

    //cy.get('#twotabsearchtextbox').type('Superman')
    //cy.get('.nav-search-submit .nav-input').click()
    //cy.get('span.a-color-state').contains('Superman')
  })
})

