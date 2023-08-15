import { createRandomUser, createRandomUserEmail } from '../support/utils';

describe('template spec', () => {
  const randomUser = createRandomUser();
  const randomUserEmail = createRandomUserEmail();

  before(() => {
    cy.visit('http://172.16.10.43:3001/login');
  });

  it('Registration and everything because it should be in one test', () => {

      // Sign Up
      cy.get('.MuiButton-containedSecondary').click();
      cy.get('[id=":r5:"]').type(randomUser.username);
      cy.get('[id=":r7:"]').type(randomUser.username);

      // This function uses callback and verifies that email includes @ 
      cy.get('[id=":r9:"]').type(`uga5n.${randomUser.uuserId}@inbox.testmail.app`).invoke('val').as('email');

      // Typing random Email and invoking them
      cy.get('[id=":rb:"]').type(randomUser.password).type("1@").invoke('val').as('password');
      cy.get('[id=":rd:"]').type(randomUser.password).type("1@").invoke('val').as('repeatPassword');   
       cy.get('svg[stroke="currentColor"]').click({ multiple: true });
       //cy.get('.css-7k72s7').should('have class', 'MuiBox-root css-7k72s7')
      cy.get('@password').then((password) => {
        cy.get('@repeatPassword').should('eq', password);
      }); // Assertion
      cy.get('form > .MuiButtonBase-root').click();
      cy.wait(5000)

      // Verifying email
    cy.request({
      method: 'GET',
      url: 'https://api.testmail.app/api/json',
      qs: {
        apikey: '193acf66-a867-4cfe-aa65-17d01453eadf',
        namespace: 'uga5n',
        pretty: true,
        limit: 1
      }
    }).then((response) => {
      let emailText = response.body.emails[0].text; 
      //cy.wait(5000)
      cy.get('.MuiTypography-h6').should('contain', 'Verify your email'); // Assertion
      cy.get('[id=":rf:"]').type(emailText).should('have.value', emailText.slice(0, -1)); // Assertion
      cy.get('form > .MuiButtonBase-root').click()
 

      //Log in
    cy.get('[id=":rh:"]').type(`uga5n.${randomUser.uuserId}@inbox.testmail.app`).invoke('val').as('logInEmail')
    cy.get('@email').then((email) => {
      cy.get('@logInEmail').should('eq', email);
    });//Assertion
    
    cy.get('[id=":rj:"]').type(randomUser.password).type('1@').invoke('val').as('passwordLogIn')
    cy.get('@password').then((password) => {
      cy.get('@passwordLogIn').should('eq', password);
    });//Assertion

    cy.get('.MuiBox-root > svg').click();
    cy.get('[id=":rj:"]').should('be.visible')
    cy.get('.MuiButton-containedPrimary').click();
    cy.get('.MuiContainer-root > :nth-child(1)').should('be.visible')
    cy.get('.MuiContainer-root > :nth-child(2)').should('be.visible')



    //Forgot Password
     let validEmail = randomUserEmail.password;
    cy.visit('http://172.16.10.43:3001/login')
    cy.url().should('eq', 'http://172.16.10.43:3001/login');//Assertion
    cy.get('.MuiButton-text').click();
    cy.get('[id=":r5:"]').type(`uga5n.${randomUser.uuserId}@inbox.testmail.app`).invoke('val').as('forgotEmail')
    cy.get('@email').then((email) => {
      cy.get('@forgotEmail').should('eq', email);
    });//Assertion
    cy.get('.MuiButtonBase-root').click();
    cy.get('.MuiTypography-root').should('be.visible')//Assertion
    cy.wait(5000)
//New get request for link
    cy.request({
      method: 'GET',
      url: 'https://api.testmail.app/api/json',
      qs: {
        apikey: '193acf66-a867-4cfe-aa65-17d01453eadf',
        namespace: 'uga5n',
        pretty: true,
        limit: 1
      }
    }).then((response) => {
      let emailText = response.body.emails[0].text;

    cy.visit(emailText)

    cy.get('[id=":r3:"]').type(randomUserEmail.password).type("1@")
    cy.get('[id=":r1:"]').type(randomUserEmail.password).type("1@")
    cy.get('[id=":r3:"]').invoke('val').as('forgotPassword')
    cy.get('[id=":r1:"]').invoke('val').as('forgotPasswordConfirm')
    cy.get('@forgotPassword').then((forgotPassword) => {
      cy.get('@forgotPasswordConfirm').should('eq', forgotPassword);
    });//Assertion
    //New password doesn't match with the old one
    cy.get('@password').then((password) => {
      cy.get('@forgotPassword').should('not.equal', password);
    });//Assertion

    // Clicking on an eye
    cy.get('svg[stroke="currentColor"]').click({ multiple: true });
    //cy.wait(500)
    cy.get('.MuiButtonBase-root').click();
    cy.get('.MuiTypography-root').should('be.visible')//Assertion


    //Log in with changed password


    cy.get('[id=":r5:"]').type(`uga5n.${randomUser.uuserId}@inbox.testmail.app`).invoke('val').as('lastEmail')
    cy.get('@email').then((email) => {
      cy.get('@lastEmail').should('eq', email);
    });//Assertion

    cy.get('[id=":r7:"]').type(randomUserEmail.password).type("1@")
    cy.get('[id=":r7:"]').invoke('val').as('lastPassword')
    // Assume you have captured the value of @forgotPassword earlier in your code

// Capture the values of @lastPassword and @forgotPassword
let lastPasswordValue;
let forgotPasswordValue;

cy.get('@lastPassword').then((lastPassword) => {
  lastPasswordValue = lastPassword;
});

cy.get('@forgotPassword').then((forgotPassword) => {
  forgotPasswordValue = forgotPassword;
});

// ...

// Now you can use the captured values for assertions
expect(lastPasswordValue).to.equal(forgotPasswordValue);


    cy.get('.MuiBox-root > svg').click();
    cy.get('.MuiButton-containedPrimary').click();
    cy.get('.MuiContainer-root > :nth-child(1)').should('be.visible')
    cy.get('.MuiContainer-root > :nth-child(2)').should('be.visible')
  });
});
});
})  ;
