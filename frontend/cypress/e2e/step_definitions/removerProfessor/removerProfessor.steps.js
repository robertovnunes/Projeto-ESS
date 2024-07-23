import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

let usuarioTipo = "professores"; // Tipo de usuário adicionado (professor, aluno, admin)
let usuarioLogin = null; // Login do usuário adicionado

// Este hook é executado antes de cada cenário individualmente
beforeEach(() => {
    // Fazer Login
    cy.visit('/login');
    cy.get(`input[name="username"]`).type('9472');
    cy.get(`input[name="password"]`).type('12345678');
    cy.get('button[type="submit"]').contains('Entrar').click();
    cy.contains('button', 'Usuários').click();

    cy.visit(`/usuarios/${usuarioTipo}`);
    cy.contains('button', "Adicionar Professor").click();
    cy.get('input[name="nome"]').type("Amanda Lima Santos");
    cy.get('input[name="login"]').type("als2");
    cy.get('input[name="senha"]').type("123");
    cy.get('input[name="SIAPE"]').type("8325111");
    cy.contains('button', 'Adicionar').click();
});

afterEach(() => {
    // Fazer logout
    cy.get('.user-icon').click();
    cy.contains('button', 'Sair').click();
    // Limpar cookies ou localStorage se necessário
    cy.clearCookies();
    cy.clearLocalStorage();
  });

// Passo para acessar a página de professores
Given('Eu estou na página {string}', (url) => {
    cy.visit(url);
  });
  
  // Passo para verificar se o usuário está na lista
  And('o usuário de login {string} está entre os usuários', (login) => {
    cy.get('.usuarios-list')
      .should('contain', login);
  });
  
  // Passo para clicar na opção de deletar conta
  When('Eu escolho a opção Deletar conta', () => {
    cy.get('[data-testid="delete-icon-als2"]').click();
  });

  // Passo para verificar se a mensagem de confirmação é exibida
  And('o sistema exibe a mensagem {string}', (message) => {
    cy.get('.modal-overlay') // Ajustado para usar a classe correta
    .should('be.visible')
    .find('p') // 
    .should('contain.text', message);
  });

  When('Eu escolho a opção {string}', (option) => {
    if (option === 'Sim') {
      cy.get('.modal-overlay') // Encontre o modal
        .find('.confirm-button') // Encontre o botão "Sim" dentro do modal
        .click(); // Clique no botão "Sim"
    } else if (option === 'Não') {
      cy.get('.modal-overlay') // Encontre o modal
        .find('.cancel-button') // Encontre o botão "Não" dentro do modal
        .click(); // Clique no botão "Não"
    }
  });

  Then('o usuário {string} de login {string} não está mais na lista de usuários', (userType, login) => {
    cy.get('.usuarios-list') // Seletor para a lista de usuários
      .should('not.contain', login); // Verifica que o login não está presente na lista
  });
  