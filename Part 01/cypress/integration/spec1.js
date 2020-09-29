describe('My First Test', function () {

  it('goto API Log Page2', function () {

    cy.visit('https://www.google.com');
    cy.title().should('eq', 'Google');
  })
})

