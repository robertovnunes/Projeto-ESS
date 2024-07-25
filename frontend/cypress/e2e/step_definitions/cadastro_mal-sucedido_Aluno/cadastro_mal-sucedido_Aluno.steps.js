import { Given, When, Then, And } from 'cypress-cucumber-preprocessor/steps';

let usuarioTipo = "alunos"; // Tipo de usuário adicionado (aluno, aluno, aluno)
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
  
  When('Eu adiciono o aluno {string} de login {string} e senha {string} no sistema', (nome, login, senha) => {
    usuarioLogin = login;
    // Verifica se a mensagem de erro está visível
      if (!(nome === "" || login === "" || senha === "")) {
        cy.get('input[name="nome"]').type(nome);
        cy.get('input[name="login"]').type(login);
        cy.get('input[name="senha"]').type(senha);
        cy.contains('button', 'Adicionar').click();
      } else {
        cy.get('input[name="nome"]').clear()
        cy.get('input[name="login"]').type(login);
        cy.get('input[name="senha"]').type(senha);
        cy.contains('button', 'Adicionar').click();        
      }
  });
  
  Then('Eu continuo na página {string}', (pagina) => {
    cy.url().should('include', pagina);
  });
  
  And('Eu vejo uma mensagem de sucesso {string}', (mensagem) => {
    thereIsToDelete = true;
    cy.contains(mensagem).should('be.visible');
  });

  // Passo para verificar se a mensagem de erro está visível
  And('Eu vejo uma mensagem de erro {string}', (message) => {
    thereIsToDelete = false;
    cy.contains(message).should('be.visible');
  });

// New step to verify the aluno exists in the database
And('o usuario do tipo {string} de login {string} está no banco de dados', (tipoUsuario, login) => {
    usuarioTipo = tipoUsuario;
    usuarioLogin = login;
    cy.visit(`/usuarios/${tipoUsuario}`);
    cy.contains(login);
  });

  And('o usuario do tipo {string} de login {string} não está no banco de dados', (tipoUsuario, login) => {
    usuarioTipo = tipoUsuario;
    usuarioLogin = login;
    cy.visit(`/usuarios/${tipoUsuario}`);
  cy.get('.usuarios-list').then($list => {
    // Verifica se o texto login não está presente na lista
    expect($list.text()).to.not.contain(login);
  });
  });

  // Passo para verificar se o usuário aluno com login específico existe
And('existe o usuário aluno com login {string}', (login) => {
  cy.get('.usuarios-list')
    .should('contain', login);
});

  // Passo para verificar se o usuário aluno com login específico não existe
And('não existe o usuário aluno com login {string}', (login) => {
  cy.get('.usuarios-list')
    .should('not.contain', login);
});

// Passo para verificar se o usuário aparece apenas uma vez na lista
And('o usuario do tipo {string} de login {string} aparece apenas uma vez no banco de dados', (tipoUsuario, login) => {
  cy.visit(`/usuarios/${tipoUsuario}`);
  
  cy.get('.usuarios-list') // Seletor para a lista de usuários
    .find('.usuario-login') // Seletor para o elemento que contém o login do usuário
    .then($logins => {
      const logins = $logins.map((i, el) => Cypress.$(el).text()).get();
      const loginCount = logins.filter(l => l === login).length;
      expect(loginCount).to.eq(1); // Verifica que o login aparece exatamente uma vez
    });
});