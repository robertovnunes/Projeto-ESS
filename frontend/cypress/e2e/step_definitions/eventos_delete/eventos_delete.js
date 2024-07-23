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

When('Eu escolho a opção "Deletar" do evento {string}', (evento) => {
  cy.contains(evento)
    .parent()
    .find('.delete-button-event')
    .click();
});

Then('O evento {string} não deve mais existir', (evento) => {
  cy.contains(evento).should('not.exist');
});
