var config = require('../../../config.json')
var configjs = require('../../../config')
const addContext = require('mochawesome/addContext');
import HomePage from '../pages/HomePage'

describe('My First Test', function () {

  var homePage = new HomePage();
    
  it('Navigate to HomePage1', function () {
    //alert(config.url);

    cy.visit(config.url);

    cy.title().should('eq', 'Google')
    homePage.clickSearchTxtBox();
    homePage.typeInSearchTxtBox('Superman');
    homePage.submitSearchQuery();
    homePage.verifyFirstResult();



    //addContext(this, 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==')

    //cy.get('#twotabsearchtextbox').type('Superman')
    //cy.get('.nav-search-submit .nav-input').click()
    //cy.get('span.a-color-state').contains('Superman')
  })

  it('Navigate to HomePage2', function () {

    //alert(config.url);

    cy.visit(config.url);
    //cy.title().should('eq', ' Test Store');
    homePage.clickSearchTxtBox();
    homePage.typeInSearchTxtBox('Superman');
    

    //addContext(this, 'data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==')

    //cy.get('#twotabsearchtextbox').type('Superman')
    //cy.get('.nav-search-submit .nav-input').click()
    //cy.get('span.a-color-state').contains('Superman')
  })
})

