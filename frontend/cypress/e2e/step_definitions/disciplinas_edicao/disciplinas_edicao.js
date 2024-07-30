import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';
let discipline = null;
afterEach(() => {
  let dataInicio = '20/05/2024'
  let dataTermino = '28/05/2024'
  let hora = '08:00 AM'
  // Recadastrar a disciplina removida
  cy.visit('/disciplines-list');
  cy.get('.discipline-list')
  .should('contain', discipline)
  .then(() => {
    cy.contains(discipline)
    .parent()
    .find('.edit-button-event')
    .click();
  });
  if(discipline == "Introdução a Programação Avançada"){
    dataInicio = '20/05/2024'
    dataTermino = '28/05/2024'
    hora = '08:00 AM'
    cy.get(`input[id="nome"]`).type("Introdução a Programação");
    cy.get(`input[id="disciplineID"]`).type("IF232");
    cy.get(`input[id="responsibleTeacher"]`).type("Alexandre Cabral Mota");
    cy.get('input[id="startDate"]').clear().type(dataInicio, { force: true }).type('{esc}');
    cy.get('input[id="endDate"]').clear().type(dataTermino, { force: true }).type('{esc}');
    cy.get('input[id="time"]').clear().type(hora, { force: true }).type('{esc}');
    cy.get(`input[id="SEG"]`).check({ force: true });
    cy.get(`input[id="QUA"]`).check({ force: true });
    cy.get(`input[id="SEX"]`).check({ force: true });
    cy.contains('button', 'Salvar').click();
  }
  if(discipline == "Matemática Discreta Avançada"){
    dataInicio = '18/05/2024'
    dataTermino = '25/05/2024'
    hora = '02:00 PM'
    cy.get(`input[id="nome"]`).type("Matemática Discreta");
    cy.get(`input[id="disciplineID"]`).type("MD101");
    cy.get(`input[id="responsibleTeacher"]`).type("Patrícia Alves Dias");
    cy.get('input[id="startDate"]').clear().type(dataInicio, { force: true }).type('{esc}');
    cy.get('input[id="endDate"]').clear().type(dataTermino, { force: true }).type('{esc}');
    cy.get('input[id="time"]').clear().type(hora, { force: true }).type('{esc}');
    cy.get(`input[id="TER"]`).check({ force: true });
    cy.get(`input[id="QUI"]`).check({ force: true });
    cy.contains('button', 'Salvar').click();

  }
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

When('Eu escolho a opção "Editar" da disciplina {string}', (disciplina) => {
  cy.contains(disciplina)
    .parent()
    .find('.edit-button-event')
    .click();
});

When('Eu preencho o campo {string} com {string}', (campo, valor) => {
  let selector = '';
  switch (campo) {
    case 'Nome da Disciplina':
      selector = '#nome';
      discipline = valor;
      break;
    case 'ID da Disciplina':
      selector = '#disciplineID';
      break;
    case 'Professor Responsável':
      selector = '#responsibleTeacher';
      break;
    default:
      selector = `input[name="${campo}"]`;
  }
  cy.get(selector).clear().type(valor, { force: true });
});

When('Eu não preencho o campo {string}', (campo) => {
  let selector = '';
  switch (campo) {
    case 'Nome da Disciplina':
      selector = '#nome';
      break;
    case 'ID da Disciplina':
      selector = '#disciplineID';
      break;
    case 'Professor Responsável':
      selector = '#responsibleTeacher';
      break;
    case 'Data de Início':
      selector = '#startDate';
      break;
    case 'Data de Término':
      selector = '#endDate';
      break;
    case 'Hora':
      selector = '#time';
      break;
    default:
      selector = `input[name="${campo}"]`;
  }
  cy.get(selector).clear(); // Limpar o campo para simular não preenchê-lo
});

When('Eu preencho a data de início com {string}', (dataInicio) => {
    cy.get('input[id="startDate"]').clear().type(dataInicio, { force: true }).type('{esc}');
  });
  
  When('Eu preencho a data de término com {string}', (dataTermino) => {
    cy.get('input[id="endDate"]').clear().type(dataTermino, { force: true }).type('{esc}');
  });
  
  When('Eu preencho a hora com {string}', (hora) => {
    cy.get('input[id="time"]').clear().type(hora, { force: true }).type('{esc}');
  });
  

When('Eu seleciono os dias da semana {string} e {string}', (dia1, dia2) => {
  cy.get(`input[id="${dia1}"]`).check({ force: true });
  cy.get(`input[id="${dia2}"]`).check({ force: true });
});

And('Eu escolho a opcao {string}', (opcao) => {
  cy.contains('button', opcao).click();
});

Then('A mensagem {string} deve ser exibida', (mensagem) => {
  cy.contains(mensagem).should('be.visible');
});