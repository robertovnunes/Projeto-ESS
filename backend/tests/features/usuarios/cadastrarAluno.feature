Feature: Cadastrar um usuário aluno
    As a usuário administrador
    I want to realizar o cadastro de um usuário administrador no sistema
    So that esses usuários possam ter acesso ao sistema de reserva

    Scenario: Cadastrando um novo aluno com sucesso
        Given não existe o usuário aluno com login "jc2"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Julio Cesar"
        And "login" "jc2"
        And "senha" "12345678"
        Then o aluno de login "jc2" está no banco de dados 

    Scenario: Cadastrando um novo aluno com o campo nome vazio
        Given não existe o usuário aluno com login "mas2"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" ""
        And "login" "mas2"
        And "senha" "sKBa87NO9@JE"
        Then o aluno de login "mas2" não está no banco de dados
        And a resposta "Campos nome, login e senha são obrigatórios" foi enviada

    Scenario: Cadastrando um novo aluno com o campo login vazio
        Given não existe o usuário aluno com login "mas2"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Amélia Maria Silva"
        And "login" ""
        And "senha" "sKBa87NO9@JE"
        Then o aluno de login "mas2" não está no banco de dados
        And a resposta "Campos nome, login e senha são obrigatórios" foi enviada

    Scenario: Cadastrando um novo aluno com o campo senha vazio
        Given não existe o usuário aluno com login "mas2"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Amélia Maria Silva"
        And "login" "mas2"
        And "senha" ""
        Then o aluno de login "mas2" não está no banco de dados
        And a resposta "Campos nome, login e senha são obrigatórios" foi enviada
    
    Scenario: Cadastrando um aluno duplicado
        Given existe o usuário aluno com login "js3"
        When eu recebo uma requisição "/POST" do administrador de login "9472"
        And "nome" "Juliana"
        And "login" "js3"
        And "senha" "12345678"
        Then o usuário de login "js3" não foi adicionado novamente
        And a resposta "Usuário já existe" foi enviada

    Scenario: Remover um aluno com sucesso
      Given o usuário aluno com login "js3" está no banco de dados
      When eu recebo uma requisição DELETE para o endpoint "/alunos/js3" do administrador de login "9472"
      Then o aluno de login "js3" foi removido do banco de dados 
      And eu recebo com codigo "204"