import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
afterEach(() => {
  // Fazer logout
   cy.get('.user-icon')
    .should('be.visible') 
    .click({ force: true }); 

  cy.contains('button', 'Sair')
    .should('be.visible') 
    .click(); 
  
  cy.clearCookies();
  cy.clearLocalStorage();
});

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

When('Eu preencho o campo {string} com {string}', (campo, valor) => {
  let selector = '';
  switch (campo) {
    case 'Nome do Evento':
      selector = '#eventName';
      break;
    case 'Professor Responsável':
      selector = '#responsibleTeacher';
      break;
    case 'Horário':
      selector = '#eventDateAndTime';
    cy.get(selector).clear().type(valor, { force: true }).type('{esc}');
      return;
    default:
      selector = `input[name="${campo}"]`;  
  }
  cy.get(selector).clear().type(valor, { force: true });
});

And('Eu escolho a opcao {string}', (opcao) => {
  cy.contains('button', opcao).click();
});

Then('A mensagem {string} deve ser exibida', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});