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
    /*cy.request({
        method: 'POST',
        url:'http://localhost:3001/equipamentos/test/getBackup'
    });*/
});

// Limpeza após cada teste
afterEach(() => {
    //restaurando banco de dados
    /*cy.request({
        method: 'POST',
        url:'http://localhost:3001/equipamentos/test/restoreBackup'
    });*/
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

Given('existem os seguintes equipamentos cadastrados', async ( equipamentos ) => {
    const equipments = JSON.parse(equipamentos);
    console.log(equipments);
    for (let equipment of equipments) {
        await cy.request({
            method: 'GET',
            url: `http://localhost:3001/equipamentos/${equipment.id}`,
        }).then((response) => {
            if (response.status !== 200) {
                cy.request({
                    method: 'POST',
                    url: `http://localhost:3001/equipamentos/test/addmock`,
                    body: equipment
                });
            }
        });
    }
});

Given('existe o seguinte equipamento cadastrado', async ( equipamento ) => {
    const equipment = JSON.parse(equipamento);
    await cy.request({
        method: 'GET',
        url: `http://localhost:3001/equipamentos/${equipment.id}`,
    }).then((response) => {
        if (response.status !== 200) {
            cy.request({
                method: 'POST',
                url: `http://localhost:3001/equipamentos/test/addmock`,
                body: equipment
            });
        }
    });
});

When('eu escolho {string}', (opcao) => {
    cy.contains(opcao).click();
});

Then('eu vejo a lista de equipamentos', (equipmentList) => {
    const equipments = JSON.parse(equipmentList);
    equipments.forEach(equipment => {
        cy.contains(equipment.nome).should('be.visible');
        cy.contains(equipment.descricao).should('be.visible');
        cy.contains(equipment.estado_conservacao).should('be.visible');
    });
});

When('eu busco por {string}', (nome) => {
    cy.get('input').type(nome);
});

And('eu seleciono {string}', (campo) => {
    cy.get('select[name="field"]').select(campo);
});

Then('eu vejo a mensagem {string}', (mensagem) => {
    cy.contains(mensagem).should('be.visible');
});