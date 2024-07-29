import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

Given('Eu estou na página {string}', (pagina) => {
  cy.visit(pagina);
});

When('eu escolho a opção {string}', (opcao) => {
  cy.contains('button', opcao).click();
});

Then('Eu sou redirecionado para a página {string}', (pagina) => {
  cy.url().should('include', pagina);
});

When('Eu adiciono um comentário com destinatário {string} e texto {string} como professor', (destinatario, texto) => {
  cy.get('input[placeholder="Digite o destinatário aqui"]').type(destinatario);
  cy.get('textarea[placeholder="Digite seu comentário aqui"]').type(texto);
  cy.contains('button', 'Enviar Comentário').click();
});

Then('Eu vejo uma mensagem de sucesso {string}', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});
