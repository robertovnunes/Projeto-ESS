import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('Eu estou logado como administrador', () => {
  cy.login('admin', 'password'); // Supondo que você tenha um comando de login configurado
});

When('eu navego para a página {string}', (pagina) => {
  cy.visit(pagina);
});

When('eu clico no botão {string} no primeiro comentário não validado', (botao) => {
  cy.get('table.comments-table tbody tr').first().within(() => {
    cy.contains(botao).click();
  });
});

Then('Eu devo ver a mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});
