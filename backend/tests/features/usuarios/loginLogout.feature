Feature: Login de um usuário
    As a usuário
    I want to acessar minha conta com meu login e senha e sair da conta quando desejar
    So that eu possa utilizar os serviços disponíveis para meu tipo de conta e sair para que outra pessoa possa acessar sua conta

        Scenario: Login com sucesso
            Given existe um usuário com login "9472" e senha "12345678"
            When eu envio uma requisição "/POST" para o endpoint "/usuarios/login"
            And "login" "9472"
            And "senha" "12345678"
            Then eu recebo uma resposta de "Login realizado com sucesso" com codigo "200"
            And o usuário tem um token de autenticação

        Scenario: Login sem sucesso
            Given não existe um usuário com login "9472" e senha "j8OiJH37kLN2"
            When eu envio uma requisição "/POST" para o endpoint "/usuarios/login"
            And "login" "9472"
            And "senha" "j8OiJH37kLN2"
            Then eu recebo uma resposta de "Credenciais Inválidas" com codigo "401"
            And o usuário não tem um token de autenticação

        Scenario: Sair de uma conta
            Given eu estou logado na conta de login "9472" com um token de autenticação
            When eu envio uma requisição "/POST" para o endpoint "/usuarios/logout"
            Then o token de autenticação foi removido
