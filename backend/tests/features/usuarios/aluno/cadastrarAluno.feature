Feature: Cadastrar um usuário aluno
    As a usuário administrador
    I want to realizar o cadastro de um usuário administrador no sistema
    So that esses usuários possam ter acesso ao sistema de reserva

    Scenario: Cadastrando um novo aluno com sucesso
        Given não existe o usuário aluno com login "ams2"
        When eu recebo uma requisição "/POST" 
        And "nome" "Amélia Maria Silva"
        And "login" "ams2"
        And "senha" "sKBa87NO9@JE"
        Then o aluno de login "ams2" está no banco de dados 

    Scenario: Cadastrando um novo aluno com o campo nome vazio
        Given eu recebo uma requisição "/POST"
        And "nome" ""
        And "login" "mas2"
        And "senha" "sKBa87NO9@JE"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Nome não pode ser vazio"

    Scenario: Cadastrando um novo aluno com o campo login vazio
        Given eu recebo uma requisição "/POST"
        And "nome" "Amélia Maria Silva"
        And "login" ""
        And "senha" "sKBa87NO9@JE"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Login não pode ser vazio"

    Scenario: Cadastrando um novo aluno com o campo senha vazio
        Given eu recebo uma requisição "/POST"
        And "nome" "Amélia Maria Silva"
        And "login" "ams2"
        And "senha" ""
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Senha não pode ser vazio"

    Scenario: Cadastrando um aluno duplicado
        Given existe o usuário "aluno" com login "9473"
        When eu recebo uma requisição "/POST"
        And "nome" "Amélia Maria Silva"
        And "login" "ams2"
        And "senha" "sKBa87NO9@JE"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Aluno já cadastrado"