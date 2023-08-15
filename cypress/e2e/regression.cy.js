import 'cypress-xpath';


describe('My First Test', () => {
    beforeEach(() => {
        cy.visit('http://172.16.10.43:3001/login');
      });
    //Log In
    it('Log in with incorrect credentials', () => {
      cy.get('[id=":r1:"]').type("thisMailIsNotRegisteret@test.com")
      cy.get('[id=":r3:"]').type("TestPassword1@")
      cy.get('.MuiButton-containedPrimary').click();
      cy.get('form > .MuiTypography-root').should('be.visible')//Assertion
    })
    it('Log in with absent password and correct Email', () =>{
        cy.get('[id=":r1:"]').type("takomikeladze91@gmail.com")
        cy.get('.MuiButton-containedPrimary').click();
        cy.get('form > .MuiTypography-root').should('be.visible')//Assertion
      })
      it('Log in with absent Email and correct Password', () =>{
        cy.get('[id=":r3:"]').type("takomikeladze91@T")
        cy.get('.MuiButton-containedPrimary').click();
        cy.get('form > .MuiTypography-root').should('be.visible')//Assertion
      })    
      it('Log in with empty credentials', () =>{
        cy.get('.MuiButton-containedPrimary').click();
        cy.get('form > .MuiTypography-root').should('be.visible')//Assertion
      })
      it('In Password using eye icon', () =>{
        cy.get('[id=":r3:"]').type("takomikeladze91@T")
        cy.get('.MuiBox-root > svg').click
        cy.get('svg[stroke="currentColor"]').first().click();
        cy.get('[id=":r3:"]').should('have.attr', 'type', 'text'); // Assertion

        

      })       

  })
