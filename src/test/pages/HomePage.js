var elements = require('../../test/locators/elements')

class HomePage {
  constructor() {

  }

  clickSearchTxtBox() {
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).click();
  }

  typeInSearchTxtBox(value) {
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).type(value);
  }

  submitSearchQuery(value) {
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).type('{enter}');
  }

  verifyFirstResult() {
    //matches exact text of result string
    //return cy.get(elements.HOMEPAGE.SEARCH_RESULT_FIRST).first().should('have.text', 'Superman Homepage');

    //matches partial text of result string
    return cy.get(elements.HOMEPAGE.SEARCH_RESULT_FIRST).first().text().then(value => {

      cy.log("Text is :", value);
      expect(value).to.include('Superman - Wikipedia');
    });
  }



}

export default HomePage;