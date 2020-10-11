var elements = require('./elements')
class HomePage {
  clickSearchTxtBox() {
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).click();
  }

  typeInSearchTxtBox(value) {
    return cy.xpath(elements.HOMEPAGE.SEARCH_TXTBOX_XPATH).type(value);
  }

  submitSearchQuery() {
    return cy.get(elements.HOMEPAGE.SEARCH_TXTBOX).type('{enter}');
  }

  }
  export default HomePage;