import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('Eu estou logado como {string} com a senha {string}', (username, password) => {
  cy.visit('/login');
  cy.get('input[name="username"]').type(username);
  cy.get('input[name="password"]').type(password);
  cy.get('button[type="submit"]').contains('Entrar').click();
  cy.url().should('include', '/mainpage');
});

When('Eu clico no ícone do usuário', () => {
  cy.get('.user-icon').click();
});

And('Eu escolho a opcao {string}', (opcao) => {
  cy.get('button').contains(opcao).click();
});

Then('Eu sou redirecionado para a página {string}', (pagina) => {
  cy.url().should('include', pagina);
});
