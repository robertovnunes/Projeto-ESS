Feature: Cadastro mal-sucedido de alunos

    Scenario: Cadastrando um aluno duplicado
        Given Eu estou na página "/usuarios/alunos"
        And existe o usuário aluno com login "js3"
        When eu escolho a opção "Adicionar Aluno"
        Then Eu sou redirecionado para a página "/usuarios/alunos/adicionar"
        When Eu adiciono o aluno "Juliana Silva" de login "js3" e senha "12345678" no sistema
        Then Eu continuo na página "/usuarios/alunos/adicionar"
        And Eu vejo uma mensagem de erro "Usuário já existe"
        And o usuario do tipo "alunos" de login "js3" aparece apenas uma vez no banco de dados

    Scenario: Cadastrando um novo aluno com campo vazio
        Given Eu estou na página "/usuarios/alunos"
        And não existe o usuário aluno com login "jml"
        When eu escolho a opção "Adicionar Aluno"
        Then Eu sou redirecionado para a página "/usuarios/alunos/adicionar"
        When Eu adiciono o aluno "" de login "jml" e senha "sKBsu7NO9O27" no sistema
        Then Eu continuo na página "/usuarios/alunos/adicionar"
        And Eu vejo uma mensagem de erro "Campos nome, login e senha são obrigatórios"
        And o usuario do tipo "alunos" de login "jml" não está no banco de dados
