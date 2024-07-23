Feature: Cadastro mal-sucedido de professores

    Scenario: Cadastrando um professor duplicado
        Given Eu estou na página "/usuarios/professores"
        And existe o usuário professor com login "cfx"
        When eu escolho a opção "Adicionar Professor"
        Then Eu sou redirecionado para a página "/usuarios/professores/adicionar"
        When Eu adiciono o professor "Charles Francis Xavier" de login "cfx", de SIAPE "1112462" e senha "sKBsu7NO9O27" no sistema
        Then Eu continuo na página "/usuarios/professores/adicionar"
        And Eu vejo uma mensagem de erro "Usuário já existe"
        And o usuario do tipo "professores" de login "cfx" aparece apenas uma vez no banco de dados

    Scenario: Cadastrando um novo professor com campo vazio
        Given Eu estou na página "/usuarios/professores"
        And não existe o usuário professor com login "jml"
        When eu escolho a opção "Adicionar Professor"
        Then Eu sou redirecionado para a página "/usuarios/professores/adicionar"
        When Eu adiciono o professor "" de login "jml", de SIAPE "8979345" e senha "sKBsu7NO9O27" no sistema
        Then Eu continuo na página "/usuarios/professores/adicionar"
        And Eu vejo uma mensagem de erro "Campos nome, login, senha e SIAPE são obrigatórios"
        And o usuario do tipo "professores" de login "jml" não está no banco de dados
