Given('I open the Google web url', () => {
    cy.visit('https://www.google.com');
    
  });
  
Then(
    'I verify title of web page as {string}',
    (title) => {
        cy.title().should('include', title);
    }
  );