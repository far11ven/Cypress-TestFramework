import HomePage from '../../../pages/HomePage/HomePage';
import ResultPage from '../../../pages/ResultPage/ResultPage';

const homePage = new HomePage();
const resultPage = new ResultPage();

Given('I open the Google web url', () => {
    cy.visit('https://www.google.com');
    
  });
  
Then(
    'I verify title of web page as {string}',
    (title) => {
        cy.title().should('include', title);
    }
  );

When(
    'I provide search query as {string}',
    (query) => {
      homePage.clickSearchTxtBox();
      homePage.typeInSearchTxtBox(query);
      homePage.submitSearchQuery();
    }
  );

Then(
    'Verify first search result to match {string} keyword',
    (search_keyword) => {
      let result = resultPage.verifyFirstResult(search_keyword);
    }
  );