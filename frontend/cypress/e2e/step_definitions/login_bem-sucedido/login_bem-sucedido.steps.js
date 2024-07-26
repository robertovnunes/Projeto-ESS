import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

// Este hook é executado depois de cada cenário individualmente
afterEach(() => {
  // Fazer logout
  cy.get('.user-icon').click();
  cy.contains('button', 'Sair').click();
  // Limpar cookies ou localStorage se necessário
  cy.clearCookies();
  cy.clearLocalStorage();
});

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
Then('Eu sou redirecionado para a página {string}', (pagina) => {
  cy.url().should('include', pagina);
});
And('Eu devo ver a mensagem {string}', (mensagem) => {
  cy.get('h2').contains(mensagem).should('be.visible');
});

Then('Eu continuo na página {string}', (pagina) => {
  cy.url().should('include', pagina);
});

And('Eu devo ver a mensagem {string}', (mensagem) => {
  cy.get('p.error-message').should('contain.text', mensagem).and('be.visible');
});