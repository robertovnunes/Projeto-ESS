Feature: Login de um usuário
    As a usuário
    I want to acessar minha conta com meu login e senha
    So that eu possa utilizar os serviços disponíveis para meu tipo de conta

        Scenario: Login com sucesso
            Given existe um usuário "administrador" com login "9472" e senha "j8OiJH37kLN2"
            When eu recebo uma requisição "/POST"
            And "login" "9472"
            And "senha" "j8OiJH37kLN2"
            Then o usuário "administrador" tem um token de autenticação

        Scenario: Login sem sucesso
            Given não existe um usuário "administrador" com login "9472" e senha "j8OiJH37kLN2"
            When eu recebo uma requisição "/POST"
            And "login" "9472"
            And "senha" "j8OiJH37kLN2"
            Then eu envio uma resposta de "erro" com codigo "404"
            And mensagem "Login ou senha incorreta"