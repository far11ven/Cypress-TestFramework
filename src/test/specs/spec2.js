var config = require('../../../config.json')
var configjs = require('../../../config')
import HomePage from '../pages/HomePage'

describe('My Second Test', function() {
    it('validate page title', function() {
      
      //alert(config.url);
      //alert(configjs.url);

      cy.viewport(1440,1200)
      cy.visit(config.url);
      cy.title().should('eq', 'Alberta Test Store')

    })

    it('goto API Log Page', function() {
      
      //alert(config.url);

      cy.viewport(1440,1200)
      cy.visit(config.url);
      var homePage = new HomePage();
      homePage.clickAPILogTraceButton();

      //cy.get('#twotabsearchtextbox').type('Superman')
      //cy.get('.nav-search-submit .nav-input').click()
      //cy.get('span.a-color-state').contains('Superman')
    })
  })
