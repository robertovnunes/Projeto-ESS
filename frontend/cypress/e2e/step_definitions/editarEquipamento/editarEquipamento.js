import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps";

Cypress.on('window:before:load', (win) => {
    cy.spy(win.console, 'error').as('consoleError');
    cy.spy(win.console, 'warn').as('consoleWarn');
});

// Este hook é executado antes de cada cenário individualmente
beforeEach(() => {
    // Fazer Login
    cy.visit('/login');
    cy.get(`input[name="username"]`).type('9472');
    cy.get(`input[name="password"]`).type('12345678');
    cy.get('button[type="submit"]').contains('Entrar').click();
    cy.contains('button', 'Equipamentos').click();
    // Fazer cópia do banco de dados
    cy.request({
        method: 'POST',
        url:'http://localhost:3001/equipamentos/test/getCopy'
    });
});

// Limpeza após cada teste
afterEach(() => {
    //restaurando banco de dados
    cy.request({
        method: 'POST',
        url:'http://localhost:3001/equipamentos/test/restoreBackup'
    });
    cy.wait(1000);
    // Garantir que o ícone do usuário está visível e clicável
    cy.get('.user-icon')
        .should('be.visible') // Verifique se o ícone está visível
        .click({ force: true }); // Forçar o clique se necessário

    // Verifique a presença do botão "Sair" antes de clicar
    cy.contains('button', 'Sair')
        .should('be.visible') // Garantir que o botão está visível
        .click(); // Clique no botão "Sair"
    cy.wait(1000);
    // Limpar cookies ou localStorage se necessário
    cy.clearCookies();
    cy.clearLocalStorage();
});

Given('que eu estou na página de Gerenciar equipamentos', (page) => {
    cy.visit('/equipamentos/manage');
});

When('eu escolho {string}', (opcao) => {
    cy.wait(1000);
    cy.contains('div', opcao).click({force: true, timeout: 10000});
});

And('eu vejo a pagina {string}', (pagina) => {
    cy.wait(1000);
    cy.url().should('include', '/buscar');
});

Then('eu devo ver os detalhes do equipamento', () => {
    cy.wait(1000);
    cy.contains(`Detalhes do equipamento`).should('be.visible');
});

Then('eu retorno a lista de equipamentos', () =>{
    cy.wait(1000);
    cy.get('button[class="close-button"]').click({force: true, timeout: 10000});
});

And('eu vejo o campo {string} com o valor {string}', (campo, valor) => {
    cy.wait(1000);
    cy.contains(valor).should('be.visible');
});

When('eu procuro por {string}', (equipamento) => {
    cy.wait(1000);
    cy.get('body').should('be.visible');
    cy.get('input').type(equipamento);
});

And('clico na linha {string}', (nome) => {
    cy.wait(1000);
    cy.contains('tr', nome).should('exist').click({force: true, timeout: 10000});
});

And('eu clico no botão {string}', (botao) => {
    cy.wait(1000);
    cy.get('button').contains(botao).click({force: true, timeout: 10000});
});

And('eu preencho o campo {string} com {string}', (campo, valor) => {
    cy.wait(1000);
    cy.get(`input[name="${campo}"]`).clear();
    cy.get(`input[name="${campo}"]`).type(valor);
});