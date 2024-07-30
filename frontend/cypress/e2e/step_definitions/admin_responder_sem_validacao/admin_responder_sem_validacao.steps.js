import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Limpeza após cada teste
afterEach(() => {
  // Garantir que o ícone do usuário está visível e clicável
  cy.get('.user-icon')
    .should('be.visible') // Verifique se o ícone está visível
    .click({ force: true }); // Forçar o clique se necessário

  // Verifique a presença do botão "Sair" antes de clicar
  cy.contains('button', 'Sair')
    .should('be.visible') // Garantir que o botão está visível
    .click(); // Clique no botão "Sair"
  
  // Limpar cookies ou localStorage se necessário
  cy.clearCookies();
  cy.clearLocalStorage();
});

Given('Eu estou logado como administrador', () => {
  cy.login('9472', '12345678'); // Supondo que você tenha um comando de login configurado
});

When('eu navego para a página {string}', (pagina) => {
  cy.visit(pagina);
});

When('eu clico no botão {string} no primeiro comentário não validado', (botao) => {
  cy.get('table.comments-table tbody tr').last().within(() => {
    cy.contains(botao).click();
  });
});

Then('Eu devo ver a mensagem {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});
