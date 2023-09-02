import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

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
  
  Then('Verify {string} response status code is {int}', (requestAliasName, statusCode) => {
    cy.get(`${requestAliasName}`).should((response)=> {
      expect(response.status).to.eq(statusCode);
      
    })
  });

  Then('Verify response details for Pokemon {string}', (pokename) => {
    cy.get('@get_pokemon_data').then((response)=> {
      
      expect(response.body).to.have.property('abilities');
      //Different ways of validating nested properties
      //1st Way
      expect(response.body).to.have.nested.property('forms[0].name','pikachu');
      //2nd Way
      expect(response.body.forms[0]).to.have.property('name','pikachu');
      //3rd Way
      const name = response.body.forms[0].name;
      assert.equal(name, pokename.toLowerCase());
      
      expect(response).to.have.property('headers');

     
    })
  });

  When('I save the user id in Test Store', () => {
    cy.get('@get_pokemon_data').then((response)=> {
      //save pokemon id
      cy.saveState("PokemonData>PokemonID", response.body.id)
    })
  
  });

  When('I make a GET request on {string} endpoint with the stored id', () => {
    cy.getState("PokemonData>PokemonID").then(pokeID => {
      cy.request({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/pokemon/' + pokeID,
        headers: {
          'Content-Type': 'application/json'  
        },
        failOnStatusCode:false
      }).as('get_pokemon_data_by_id')
    })
  });