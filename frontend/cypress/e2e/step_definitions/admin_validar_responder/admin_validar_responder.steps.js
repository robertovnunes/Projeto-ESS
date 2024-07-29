import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('Eu estou logado como administrador', () => {
  cy.login('admin', 'password'); // Supondo que você tenha um comando de login configurado
});

When('eu navego para a página {string}', (pagina) => {
  cy.visit(pagina);
});

Then('Eu devo ver a tabela de comentários', () => {
  cy.get('table.comments-table').should('exist');
});

When('eu clico no botão {string} no primeiro comentário', (botao) => {
  cy.get('table.comments-table tbody tr').first().within(() => {
    cy.contains(botao).click();
  });
});

Then('Eu devo ver a mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});

When('eu escrevo {string} na área de texto da resposta', (resposta) => {
  cy.get('.response-popup textarea').type(resposta);
});

When('eu clico no botão {string} no pop-up de resposta', (botao) => {
  cy.get('.response-popup button').contains(botao).click();
});
