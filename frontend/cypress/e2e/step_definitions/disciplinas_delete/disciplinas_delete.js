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

When('Eu escolho a opção "Deletar" da disciplina {string}', (disciplina) => {
  cy.contains(disciplina)
    .parent()
    .find('.delete-button-event')
    .click();
});

Then('A mensagem {string} deve ser exibida', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});

When('Eu escolho a disciplina {string}', (disciplina) => {
  cy.contains(disciplina).click();
});

Then('Eu vejo a mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});

Then('A disciplina {string} não deve mais existir', (disciplina) => {
  cy.contains(disciplina).should('not.exist');
});
