var config = require('../../../config.json')
var configjs = require('../../../config')
const addContext = require('mochawesome/addContext');
import HomePage from '../pages/HomePage'

describe('My Second Test', function () {

  var homePage = new HomePage();

  it('goto API Log Page2', function () {

    cy.visit(config.url);
    cy.title().should('eq', 'Google');
  })
})

