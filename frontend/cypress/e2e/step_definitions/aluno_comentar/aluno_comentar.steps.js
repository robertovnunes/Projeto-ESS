import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

// Este hook é executado antes de cada cenário individualmente
beforeEach(() => {
  // Fazer Login
  cy.visit('/login');
  cy.get(`input[name="username"]`).type('js3');
  cy.get(`input[name="password"]`).type('12345678');
  cy.get('button[type="submit"]').contains('Entrar').click();
});

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

Given('Eu estou na página {string}', (pagina) => {
  cy.visit(pagina);
});

When('eu escolho a opção {string}', (opcao) => {
  cy.contains('button', opcao).click();
});

Then('Eu sou redirecionado para a página {string}', (pagina) => {
  cy.url().should('include', pagina);
});

When('Eu adiciono um comentário com destinatário {string}, secretaria responsável {string} e texto {string} como aluno', (destinatario, secretaria, texto) => {
  cy.get('input[placeholder="Digite o destinatário aqui"]').type(destinatario);
  cy.get('input[placeholder="Digite a secretaria responsável aqui"]').type(secretaria);
  cy.get('textarea[placeholder="Digite seu comentário aqui"]').type(texto);
  cy.contains('button', 'Enviar Comentário').click();
});

Then('Eu vejo uma mensagem de sucesso {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});
