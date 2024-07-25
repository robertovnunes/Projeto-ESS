Feature: Cadastrar um usuário professor
    As a usuário administrador
    I want to realizar o cadastro de um usuário professor ou usuário administrador no sistema
    So that esses usuários possam ter acesso ao sistema de reserva

    Scenario: Cadastrando um novo professor com sucesso
        Given não existe o usuário professor com login "cs8"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Caio Santos"
        And "login" "cs8"
        And "SIAPE" "8979462"
        And "senha" "sKasw9NO95g4"
        Then o professor de login "cs8" está no banco de dados

    Scenario: Cadastrando um novo professor com o campo nome vazio
        Given não existe o usuário professor com login "jml"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" ""
        And "login" "jml"
        And "SIAPE" "8979345"
        And "senha" "sKBa87NO9@JE"
        Then o professor de login "jml" não está no banco de dados
        And a resposta "Campos nome, login, senha e SIAPE são obrigatórios" foi enviada

    Scenario: Cadastrando um novo professor com o campo login vazio
        Given não existe o usuário professor com login "jml"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Jorge Moisés Lima"
        And "login" ""
        And "SIAPE" "8979345"
        And "senha" "sKBa87NO9@JE"
        Then o professor de login "jml" não está no banco de dados
        And a resposta "Campos nome, login, senha e SIAPE são obrigatórios" foi enviada

    Scenario: Cadastrando um novo professor com o campo SIAPE vazio
        Given não existe o usuário professor com login "jml"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Amélia Maria Silva"
        And "login" "mas2"
        And "SIAPE" ""
        And "senha" "12345678"
        Then o professor de login "jml" não está no banco de dados
        And a resposta "Campos nome, login, senha e SIAPE são obrigatórios" foi enviada

    Scenario: Cadastrando um novo professor com o campo senha vazio
        Given não existe o usuário professor com login "jml"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Amélia Maria Silva"
        And "login" "mas2"
        And "SIAPE" "8979345"
        And "senha" ""
        Then o professor de login "jml" não está no banco de dados
        And a resposta "Campos nome, login, senha e SIAPE são obrigatórios" foi enviada

    Scenario: Cadastrando um professor duplicado
        Given existe o usuário professor com login "cfx"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Charles Francis Xavier"
        And "login" "cfx"
        And "SIAPE" "8888811"
        And "senha" "234wsdg456"
        Then o usuário de login "cfx" não foi adicionado novamente
        And a resposta "Usuário já existe" foi enviada
    
    Scenario: Remover um professor com sucesso
      Given o usuário professor com login "whw" está no banco de dados
      When eu recebo uma requisição DELETE para o endpoint "/professores/whw" do administrador de login "9472"
      Then o professor de login "whw" foi removido do banco de dados 
      And eu recebo com codigo "204"