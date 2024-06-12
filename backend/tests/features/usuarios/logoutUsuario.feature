Feature: Login de um usuário
    As a usuário
    I want to sair da minha conta
    So that outra conta possa ser acessada

        Scenario: Sair de uma conta
            Given eu estou logado em uma conta com um token de autenticação
            When eu recebo uma requisição "/DELETE"
            Then  o token de autenticação foi removido