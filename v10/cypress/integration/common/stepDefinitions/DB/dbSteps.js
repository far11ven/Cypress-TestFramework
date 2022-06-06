Given('I execute select all query on pokemon DB',() => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
      select * from pokemon    
      `
    }).then((result) => {
      console.log(result.rows)
    });
  });

  When('I execute selet query on pokemon DB, where name equals {string}',(pokemonName) => {
    cy.task("DATABASE", {
      dbConfig: Cypress.env("DB"),
      sql: `
      select * from pokemon where Poke_Name = '${pokemonName}'   
      `
    }).then((result) => {
      console.log(result.rows[0]);
      expect(result.rows[0].Poke_Name).to.have.string(`${pokemonName}`);
    });
  });
