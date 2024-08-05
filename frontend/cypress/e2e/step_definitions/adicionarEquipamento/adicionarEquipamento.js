import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

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
        url:'http://localhost:3001/equipamentos/test/getBackup'
    });
});

// Limpeza após cada teste
afterEach(() => {
    //restaurando banco de dados
    cy.request({
        method: 'POST',
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

Given('que eu estou na página de {string}', (pagina) => {
    cy.visit(`/equipamentos/manage`);
});

When('eu escolho {string}', (opcao) => {
    cy.contains(opcao).click();
});

Then('eu devo ser redirecionado para a página de {string}', (pagina) => {
    cy.contains(pagina).should('be.visible');
});

When('eu preencho o campo {string} com {string}', (campo, valor) => {
    if(valor === ''){
        cy.get(`input[name="${campo}"]`).clear();
    } else {
        cy.get(`input[name="${campo}"]`).type(valor);
    }
});

And('eu preencho o campo {string} com {string}', async(campo, valor) => {
    if(valor === ''){
        cy.get(`input[name="${campo}"]`).clear();
    } else {
        cy.get(`input[name="${campo}"]`).type(valor);
    }
});

And('eu escolho {string} como identificador', (valor) => {
    cy.get(`#identificador`).select(valor);
});

And('eu escolho {string}', async (opcao) => {
    cy.get(opcao).click();
});

And('eu tenho um equipamento com o {string} {string}', async(identificador, valor) => {
    const identifier = identificador === 'patrimônio' ? 'patrimonio' : 'numero_serie';
    let equipamento = {
        nome: 'Equipamento Teste',
        descricao: 'Descrição do Equipamento Teste',
        estado_conservacao: 'Bom',
        data_aquisicao: '2021-01-01',
        valor_estimado: '1000.00',
        [identifier]: valor
    };
    cy.request({
        method: 'POST',
        url: 'http://localhost:3001/equipamentos/test/addmock',
        body: equipamento
    });
});


Then('eu vejo a mensagem {string}', (message) => {
    cy.contains(message).should('be.visible');
});

