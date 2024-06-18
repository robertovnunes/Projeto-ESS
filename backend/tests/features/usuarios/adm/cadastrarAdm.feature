Feature: Cadastrar um usuário administrador
    As a usuário administrador
    I want to realizar o cadastro de um usuário administrador no sistema
    So that esses usuários possam ter acesso ao sistema de reserva

    Scenario: Cadastrando um novo administrador com sucesso
        Given não existe o usuário administrador com login "9473"
        When eu recebo uma requisição "/POST" do administrador de login "9112"
        And "nome" "Maria Santos"
        And "login" "9473"
        And "senha" "sKBsu7NO9O27"
        Then o administrador de login "9473" está no banco de dados 

    Scenario: Cadastrando um novo administrador com o campo nome vazio
        Given eu recebo uma requisição "/POST"
        And "nome" ""
        And "login" "9473"
        And "senha" "sKBsu7NO9O27"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Nome não pode ser vazio"

    Scenario: Cadastrando um novo administrador com o campo login vazio
        Given eu recebo uma requisição "/POST"
        And "nome" "Maria Santos"
        And "login" ""
        And "senha" "sKBsu7NO9O27"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Login não pode ser vazio"

    Scenario: Cadastrando um novo administrador com o campo senha vazio
        Given eu recebo uma requisição "/POST"
        And "nome" "Maria Santos"
        And "login" "9473"
        And "senha" ""
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Senha não pode ser vazio"

    Scenario: Cadastrando um administrador duplicado
        Given existe o usuário "administrador" com login "9473"
        When eu recebo uma requisição "/POST" do administrador de login "9112"
        And "nome" "Maria Santos"
        And "login" "9473"
        And "senha" "sKBsu7NO9O27"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Administrador já cadastrado"