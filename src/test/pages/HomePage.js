var elements = require('../../test/locators/elements')

class HomePage {
    constructor() {
    
    }

    clickAPILogTraceButton() {
      return cy.get(elements.HOMEPAGE.API_LOG_TRACE).click();
    }
    
  }
  
  export default HomePage;