Feature: Cadastrar um usuário administrador
    As a usuário administrador
    I want to realizar o cadastro de um usuário administrador no sistema
    So that esses usuários possam ter acesso ao sistema de reserva

    Scenario: Cadastrando um novo administrador com sucesso
        Given não existe o usuário administrador com login "9473"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Maria Santos"
        And "login" "9473"
        And "senha" "sKBsu7NO9O27"
        Then o administrador de login "9473" está no banco de dados 

    Scenario: Cadastrando um novo administrador com o campo nome vazio
        Given não existe o usuário administrador com login "9999"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" ""
        And "login" "9999"
        And "senha" "sKBsu7NO9O27"
        Then o administrador de login "9999" não está no banco de dados
        And eu recebo uma resposta de "Campos nome, login e senha são obrigatórios" com codigo "400"

    Scenario: Cadastrando um novo administrador com o campo login vazio
        Given não existe o usuário administrador com login "9999"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Elena Santos"
        And "login" ""
        And "senha" "sKBsu7NO9O27"
        Then o administrador de login "9999" não está no banco de dados
        And eu recebo uma resposta de "Campos nome, login e senha são obrigatórios" com codigo "400"

    Scenario: Cadastrando um novo administrador com o campo senha vazio
        Given não existe o usuário administrador com login "9999"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Elena Santos"
        And "login" "9999"
        And "senha" ""
        Then o administrador de login "9999" não está no banco de dados
        And eu recebo uma resposta de "Campos nome, login e senha são obrigatórios" com codigo "400"

    Scenario: Cadastrando um administrador duplicado
        Given existe o usuário administrador com login "8000"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Amanda Gonçalves Santos"
        And "login" "8000"
        And "senha" "sKBsu7NO9O27"
        Then o usuário de login "8000" não foi adicionado novamente
        And eu recebo uma resposta de "Usuário já existe" com codigo "409"

    Scenario: Remover um administrador com sucesso
      Given o usuário administrador com login "8000" está no banco de dados
      When eu recebo uma requisição DELETE para o endpoint "/admins/8000" do administrador de login "9472"
      Then o administrador de login "8000" foi removido do banco de dados 
      And eu recebo com codigo "204"