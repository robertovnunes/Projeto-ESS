import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
afterEach(() => {
  let dataInicio = '20/05/2024'
  let dataTermino = '28/05/2024'
  let hora = '08:00 AM'
  cy.visit('/create-discipline');
  cy.get(`input[id="nome"]`).type("Introdução a Programação");
  cy.get(`input[id="disciplineID"]`).type("IF232");
  cy.get(`input[id="responsibleTeacher"]`).type("Alexandre Cabral Mota");
  cy.get('input[id="startDate"]').clear().type(dataInicio, { force: true }).type('{esc}');
  cy.get('input[id="endDate"]').clear().type(dataTermino, { force: true }).type('{esc}');
  cy.get('input[id="time"]').clear().type(hora, { force: true }).type('{esc}');
  cy.get(`input[id="SEG"]`).check({ force: true });
  cy.get(`input[id="QUA"]`).check({ force: true });
  cy.get(`input[id="SEX"]`).check({ force: true });
  cy.contains('button', 'Cadastrar Disciplina').click();
  
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