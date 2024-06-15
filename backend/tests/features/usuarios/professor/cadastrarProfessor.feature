Feature: Cadastrar um usuário professor
    As a usuário administrador
    I want to realizar o cadastro de um usuário professor ou usuário administrador no sistema
    So that esses usuários possam ter acesso ao sistema de reserva

    Scenario: Cadastrando um novo professor com sucesso
        Given não existe o usuário professor com login "cs8"
        When eu recebo uma requisição "/POST" do administrador de login "9112"
        And "nome" "Caio Santos"
        And "login" "cs8"
        And "SIEPE" "8979462"
        And "senha" "sKasw9NO95g4"
        Then o professor de login "cs8" está no banco de dados 

    Scenario: Cadastrando um novo professor com o campo nome vazio
        Given eu recebo uma requisição "/POST"
        And "nome" ""
        And "login" "cs8"
        And "SIEPE" "8979462"
        And "senha" "sKasw9NO95g4"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Nome não pode ser vazio"

    Scenario: Cadastrando um novo professor com o campo login vazio
        Given eu recebo uma requisição "/POST"
        And "nome" "Caio Santos"
        And "login" ""
        And "SIEPE" "8979462"
        And "senha" "sKasw9NO95g4"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Login não pode ser vazio"

    Scenario: Cadastrando um novo professor com o campo SIEPE vazio
        Given eu recebo uma requisição "/POST"
        And "nome" "Caio Santos"
        And "login" "cs8"
        And "SIEPE" ""
        And "senha" "sKasw9NO95g4"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "SIEPE não pode ser vazio"

    Scenario: Cadastrando um novo professor com o campo senha vazio
        Given eu recebo uma requisição "/POST"
        And "nome" "Caio Santos"
        And "login" "cs8"
        And "SIEPE" "8979462"
        And "senha" ""
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Senha não pode ser vazio"

    Scenario: Cadastrando um professor duplicado
        Given existe o usuário "professor" com login "cs8"
        When eu recebo uma requisição "/POST" do administrador de login "9112"
        And "nome" "Caio Santos"
        And "login" "cs8"
        And "SIEPE" "8979462"
        And "senha" "sKasw9NO95g4"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Professor já cadastrado"