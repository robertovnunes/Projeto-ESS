import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('Eu visito a página {string}', (pagina) => {
  cy.visit(pagina);
});

When('Eu preencho o campo {string} com {string}', (campo, valor) => {
  cy.get(`input[name="${campo}"]`).type(valor);
});

And('Eu preencho o campo {string} com {string}', (campo, valor) => {
  cy.get(`input[name="${campo}"]`).type(valor);
});

And('Eu escolho a opcao {string}', (opcao) => {
  cy.get('button[type="submit"]').contains(opcao).click();
});

Then('Eu continuo na página {string}', (pagina) => {
  cy.url().should('include', pagina);
});

And('Eu devo ver a mensagem {string}', (mensagem) => {
  cy.get('p.error-message').should('contain.text', mensagem).and('be.visible');
});

// Novo passo para verificar campos vazios
And('Eu deixo o campo {string} vazio', (campo) => {
    // Deixa o campo especificado vazio e preenche o outro campo
    cy.get(`input[name="${campo}"]`).clear();
    cy.get(`input[name="${campo === 'username' ? 'password' : 'username'}"]`);
    cy.contains('button', 'Entrar').click();
  });

  And('O campo {string} deve exibir um erro', (campo) => {
    cy.get(`input[name="${campo}"]`).should('have.length', 1);
  });