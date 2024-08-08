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
        method: 'POST',
        url:'http://localhost:3001/equipamentos/test/getCopy'
    });
    cy.wait(1000);
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
    // Limpar cookies ou localStorage se necessário
    cy.clearCookies();
    cy.clearLocalStorage();
});

Given('que eu estou na pagina de gerenciar equipamentos', () => {
    cy.visit('/equipamentos/manage');
});

When('eu clico no botão {string}', (botao) => {
    cy.wait(1000);
    cy.get('div').contains(botao).click({force: true, timeout: 10000});
});

When('eu clico em {string}', (opcao) => {
    cy.wait(1000);
    cy.contains('tr', opcao).should('exist').click({force: true, timeout: 10000});
});

When('eu escolho {string}', (opcao) => {
    cy.wait(1000);
    cy.contains('div', opcao).click({force: true, timeout: 10000});
});

Then('eu devo ver a lista de equipamentos', () => {
    cy.wait(1000);
    cy.get('table').should('be.visible');
});

And('eu clico em {string}', (opcao) => {
    cy.wait(1000);
    cy.contains('tr', opcao).should('exist').click({force: true, timeout: 10000});
});

Then('eu devo ver a mensagem {string}', (mensagem) => {
    cy.wait(1000);
    cy.contains(mensagem).should('be.visible');
});