import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

import HomePage from '../../pages/HomePage/HomePage';
import ResultPage from '../../pages/ResultPage/ResultPage';
const addContext = require('mochawesome/addContext');

const homePage = new HomePage();
const resultPage = new ResultPage();

Given('I open the Google web url', () => {
    cy.visit('/');
    cy.reportLog("This is Subject");
    cy.reportLogKV("This is key!","This is value!");
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