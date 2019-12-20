describe('test', function() {
    it('test', function() {
      cy.visit('http://localhost:8081')
      cy.server().route("GET", 'https://api.github.com/users/tigromol/repos').as('getRepos')
      cy.get('#user').clear().type('tigromol');
      cy.get('#butt').click();
      cy.wait('@getRepos');
      cy.get('.outer').find('.repo').its('length').should('eq', 6);
    })

    it('user not exists', function() {
      cy.visit('http://localhost:8081')
      cy.server().route("GET", 'https://api.github.com/users/fnjiaefiwa/repos').as('getRepos')
      cy.get('#user').clear().type('fnjiaefiwa');
      cy.get('#butt').click();
      cy.wait('@getRepos');
      cy.get('.outer').find('.repo').its('length').should('eq', 1);
      cy.get('.outer').find('.repo').should('have.text', '404');
    })

    it('test other user', function() {
      cy.visit('http://localhost:8081')
      cy.server().route("GET", 'https://api.github.com/users/misgorod/repos').as('getRepos')
      cy.get('#user').clear().type('misgorod');
      cy.get('#butt').click();
      cy.wait('@getRepos');
      cy.get('.outer').find('.repo').its('length').should('eq', 12);
    })
  })