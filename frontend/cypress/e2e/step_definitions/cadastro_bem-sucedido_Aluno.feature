Feature: Cadastro bem-sucedido de Aluno

    Scenario: Cadastrando um novo Aluno
        Given Eu estou na página "/usuarios/alunos"
        And não existe o usuário aluno com login "js4"
        When eu escolho a opção "Adicionar Aluno"
        Then Eu sou redirecionado para a página "/usuarios/alunos/adicionar"
        When Eu adiciono o aluno "Julia Santos" de login "js4" e senha "sKasw9NO95g4" no sistema
        Then Eu continuo na página "/usuarios/alunos/adicionar"
        And Eu vejo uma mensagem de sucesso "Cadastro realizado com sucesso"
        And o usuario do tipo "alunos" de login "js4" está no banco de dados