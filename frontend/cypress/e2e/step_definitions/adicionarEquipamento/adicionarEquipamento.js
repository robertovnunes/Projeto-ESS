import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

// Este hook é executado antes de cada cenário individualmente
beforeEach(() => {
    // Fazer Login
    cy.visit('/login');
    cy.get(`input[name="username"]`).type('9472');
    cy.get(`input[name="password"]`).type('12345678');
    cy.get('button[type="submit"]').contains('Entrar').click();
    cy.contains('button', 'Equipamentos').click();
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

Given('que eu estou na página de {string}', (pagina) => {
    cy.contains(pagina).click();
});

When('eu escolho {string}', (opcao) => {
    cy.contains(opcao).click();
});

Then('eu devo ser redirecionado para a página de {string}', (pagina) => {
    cy.contains(pagina).should('be.visible');
});

When('eu preencho o campo {string} com {string}', (campo, valor) => {
    cy.get(`input[name="${campo}"]`).type(valor);
});

And('eu preencho o campo {string} com {string}', (campo, valor) => {
    cy.get(`input[name="${campo}"]`).type(valor);
});

And('eu escolho {string} como identificador', (valor) => {
    cy.get(`input[name="identificador"]`).type(valor);
});

And('eu escolho {string}', (opcao) => {
    cy.contains(opcao).click();
});

Then('eu vejo a mensagem {string}', (message) => {
    cy.contains(message).should('be.visible');
});