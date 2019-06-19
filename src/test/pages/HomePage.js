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


    
  }
  
  export default HomePage;