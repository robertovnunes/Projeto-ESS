import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

let usuarioTipo = "professores"; // Tipo de usuário adicionado (professor, aluno, admin)
let usuarioLogin = null; // Login do usuário adicionado
let thereIsToDelete = false;

// Este hook é executado antes de cada cenário individualmente
beforeEach(() => {
    // Fazer Login
    cy.visit('/login');
    cy.get(`input[name="username"]`).type('9472');
    cy.get(`input[name="password"]`).type('12345678');
    cy.get('button[type="submit"]').contains('Entrar').click();
    cy.contains('button', 'Usuários').click();
});

// Limpeza após cada teste
afterEach(() => {
  cy.get('.usuarios-list')
  .should('contain', usuarioLogin)
  .then(() => {
      cy.get(`[data-testid="delete-icon-${usuarioLogin}"]`).click();
      cy.get('.modal-overlay') // Encontre o modal
        .should('be.visible') // Certifique-se de que o modal está visível
        .find('.confirm-button') // Encontre o botão "Sim" dentro do modal
        .click(); // Clique no botão "Sim"
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


Given('Eu estou na página {string}', (pagina) => {
    cy.visit(pagina);
  });
  
  When('eu escolho a opção {string}', (opcao) => {
    cy.contains('button', opcao).click();
  });
  
  Then('Eu sou redirecionado para a página {string}', (pagina) => {
    cy.url().should('include', pagina);
  });
  
  When('Eu adiciono o professor {string} de login {string}, de SIAPE {string} e senha {string} no sistema', (nome, login, siape, senha) => {
    usuarioLogin = login;
    cy.get('input[name="nome"]').type(nome);
    cy.get('input[name="login"]').type(login);
    cy.get('input[name="senha"]').type(senha);
    cy.get('input[name="SIAPE"]').type(siape);
    cy.contains('button', 'Adicionar').click();
  });
  
  Then('Eu continuo na página {string}', (pagina) => {
    cy.url().should('include', pagina);
  });
  
  And('Eu vejo uma mensagem de sucesso {string}', (mensagem) => {
    thereIsToDelete = true;
    cy.contains(mensagem).should('be.visible');
  });

  // Passo para verificar se o usuário professor com login específico não existe
And('não existe o usuário professor com login {string}', (login) => {
  cy.get('.usuarios-list')
    .should('not.contain', login);
});

// New step to verify the professor exists in the database
And('o usuario do tipo {string} de login {string} está no banco de dados', (tipoUsuario, login) => {
    usuarioTipo = tipoUsuario;
    usuarioLogin = login;
    cy.visit(`/usuarios/${tipoUsuario}`);
    cy.contains(login);
  });

