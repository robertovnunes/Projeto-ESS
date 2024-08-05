import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

// Este hook é executado antes de cada cenário individualmente
beforeEach(() => {
    // Fazer Login
    cy.visit('/login');
    cy.get(`input[name="username"]`).type('9472');
    cy.get(`input[name="password"]`).type('12345678');
    cy.get('button[type="submit"]').contains('Entrar').click();
    cy.contains('button', 'Equipamentos').click();
    // Fazer backup do banco de dados
    cy.request({
        method: 'GET',
        url:'http://localhost:3001/equipamentos/test/getCopy'
    });
});

// Limpeza após cada teste
afterEach(() => {
    //restaurando banco de dados
    cy.request({
        method: 'GET',
        url:'http://localhost:3001/equipamentos/test/restoreBackup'
    });

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

Given('que eu estou na página de {string}', (page) => {
    cy.contains(page).click();
});

When('eu escolho {string}', (opcao) => {
    cy.contains(opcao).click();
});

Then('eu devo ver a pagina {string}', (pagina) => {
    cy.contains(pagina).should('be.visible');
});

Then('eu devo ver os detalhes do equipamento', () => {
    cy.contains(`Detalhes do equipamento`).should('be.visible');
});

Then('eu vejo a o campo {string} com o valor {string}', (campo, valor) => {
    cy.get(`input[name="${campo}"]`).should('have.value', valor);
});

When('eu procuro por {string}', (equipamento) => {
    cy.get('input').type(equipamento);
});

And('clico na linha {string}', (nome) => {
    cy.get('tr').contains(nome).click();
});

And('eu preencho o campo {string} com {string}', (campo, valor) => {
    cy.get(`input[name="${campo}"]`).type(valor);
});