Feature: Cadastro bem-sucedido de Admin

    Scenario: Cadastrando um novo Admin
        Given Eu estou na página "/usuarios/admins"
        And não existe o usuário admin com login "js4"
        When eu escolho a opção "Adicionar Admin"
        Then Eu sou redirecionado para a página "/usuarios/admins/adicionar"
        When Eu adiciono o admin "Julia Santos" de login "js4" e senha "sKasw9NO95g4" no sistema
        Then Eu continuo na página "/usuarios/admins/adicionar"
        And Eu vejo uma mensagem de sucesso "Cadastro realizado com sucesso"
        And o usuario do tipo "admins" de login "js4" está no banco de dados