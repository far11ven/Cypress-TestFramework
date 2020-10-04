Given('As a user I want to execute Pokemon GET api for Pokemon {string}', (pokename) => {
    cy.request({
      method: 'GET',
      url: 'https://pokeapi.co/api/v2/pokemon/' + pokename,
      headers: {
        'Content-Type': 'application/json'  
      },
      failOnStatusCode:false
    }).as('get_pokemon_data')
  
  });
  
  Then('Verify response status code is {int}', (statusCode) => {
    cy.get('@get_pokemon_data').should((response)=> {
      expect(response.status).to.eq(statusCode);
      
    })
  });

  Then('Verify response details for Pokemon {string}', (pokenmae) => {
    cy.get('@get_pokemon_data').should((response)=> {
      
      expect(response.body).to.have.property('abilities');
      //Different ways of validating nested properties
      //1st Way
      expect(response.body).to.have.nested.property('forms[0].name','pikachu');
      //2nd Way
      expect(response.body.forms[0]).to.have.property('name','pikachu');
      //3rd Way
      const name = response.body.forms[0].name;
      assert.equal(name, 'pikachu');
      
      expect(response).to.have.property('headers');
    })
  });