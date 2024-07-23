import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

Given('Eu estou logado como {string}', (usuario) => {
  cy.setCookie('userType', usuario);
});

When('Eu visito a página {string}', (pagina) => {
  cy.visit(pagina);
});

And('Eu escolho a opcao {string}', (opcao) => {
  cy.contains(opcao).click();
});

Then('Eu sou redirecionado para a página {string}', (pagina) => {
  cy.url().should('include', pagina);
});

When('Eu clico no botão "Ver Salas" da disciplina {string}', (disciplina) => {
  cy.contains(disciplina)
    .parent()
    .find('.view-rooms-button')
    .click();
});

Then('Eu vejo a mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});
