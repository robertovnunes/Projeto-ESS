import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
let evento = '';
afterEach(() => {
  cy.visit('/events-list');
  cy.get('.discipline-list')
  .should('contain', evento)
  .then(() => {
    cy.contains(evento)
    .parent()
    .find('.edit-button-event')
    .click();
  });
  
    cy.get(`input[id="eventName"]`).type("Workshop Drones");
    cy.get(`input[id="responsibleTeacher"]`).type("João Pedro");
    cy.get(`input[id="eventDateAndTime"]`).clear().type("05/08/2024 04:00 PM");
    cy.contains('button', 'Salvar').click();
  
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

When('Eu escolho a opção "Editar" do evento {string}', (evento) => {
  cy.contains(evento)
    .parent()
    .find('.edit-button-event')
    .click();
});

When('Eu preencho o campo {string} com {string}', (campo, valor) => {
  let selector = '';
  switch (campo) {
    case 'Nome do Evento':
      selector = '#eventName';
      evento = valor;
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