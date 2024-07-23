Feature: Cadastro mal-sucedido de admins

    Scenario: Cadastrando um admin duplicado
        Given Eu estou na página "/usuarios/admins"
        And existe o usuário admin com login "8000"
        When eu escolho a opção "Adicionar Admin"
        Then Eu sou redirecionado para a página "/usuarios/admins/adicionar"
        When Eu adiciono o admin "Amanda Gonçalves Santos" de login "8000" e senha "sKBsu7NO9O27" no sistema
        Then Eu continuo na página "/usuarios/admins/adicionar"
        And Eu vejo uma mensagem de erro "Usuário já existe"
        And o usuario do tipo "admins" de login "8000" aparece apenas uma vez no banco de dados

    Scenario: Cadastrando um novo admin com campo vazio
        Given Eu estou na página "/usuarios/admins"
        And não existe o usuário admin com login "jml"
        When eu escolho a opção "Adicionar Admin"
        Then Eu sou redirecionado para a página "/usuarios/admins/adicionar"
        When Eu adiciono o admin "" de login "jml" e senha "sKBsu7NO9O27" no sistema
        Then Eu continuo na página "/usuarios/admins/adicionar"
        And Eu vejo uma mensagem de erro "Campos nome, login e senha são obrigatórios"
        And o usuario do tipo "admins" de login "jml" não está no banco de dados
