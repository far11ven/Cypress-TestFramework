var config = require('../../../config.json')
var configjs = require('../../../config')
const addContext = require('mochawesome/addContext');
import HomePage from '../pages/HomePage'

describe('My Second Test', function () {

  const spec_title = this.title

  Cypress.on('test:after:run', (test) => {

    if (test.state === 'failed') {
      addContext({ test }, {
        title: 'Failing Screenshot: ' + '>> screenshots/' + Cypress.spec.name + '/' + spec_title + ' -- ' + test.title + ' (failed)' + '.png <<',
        value: 'screenshots/' + Cypress.spec.name + '/' + spec_title + ' -- ' + test.title + ' (failed)' + '.png'
      })
    }
  });


  it('goto API Log Page2', function () {

    cy.visit(config.url);
  })
})

