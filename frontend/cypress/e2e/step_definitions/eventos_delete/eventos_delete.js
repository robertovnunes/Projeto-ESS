import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

afterEach(() => {

  cy.visit('/create-event');
  cy.get(`input[id="eventName"]`).type("Workshop Drones");
  cy.get(`input[id="responsibleTeacher"]`).type("João Pedro");
  cy.get(`input[id="eventDateAndTime"]`).type("05/08/2024 04:00 PM");
  cy.contains('button', 'Cadastrar Evento').click();
  
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
  cy.contains(opcao).click({force : true});
});

Then('Eu sou redirecionado para a página {string}', (pagina) => {
  cy.url().should('include', pagina);
});

When('Eu escolho a opção "Deletar" do evento {string}', (evento) => {
  cy.contains(evento)
    .parent()
    .find('.delete-button-event')
    .click({force : true});
});

Then('O evento {string} não deve mais existir', (evento) => {
  cy.contains(evento).should('not.exist');
});