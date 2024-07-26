Feature: Cadastro bem-sucedido de professor

    Scenario: Cadastrando um novo professor
        Given Eu estou na página "/usuarios/professores"
        And não existe o usuário professor com login "als2"
        When eu escolho a opção "Adicionar Professor"
        Then Eu sou redirecionado para a página "/usuarios/professores/adicionar"
        When Eu adiciono o professor "Amanda Lima Santos" de login "als2", de SIAPE "8421462" e senha "sKasw9NO95g4" no sistema
        Then Eu continuo na página "/usuarios/professores/adicionar"
        And Eu vejo uma mensagem de sucesso "Cadastro realizado com sucesso"
        And o usuario do tipo "professores" de login "als2" está no banco de dados