Feature: Remover Administrador

    Scenario: Deletar a conta de um usuário Administrador
    Given Eu estou na página "/usuarios/admins"
    And o usuário de login "als2" está entre os usuários
    When Eu escolho a opção Deletar conta
    And o sistema exibe a mensagem "Tem certeza de que deseja deletar o administrador com login als2?"
    When Eu escolho a opção "Sim"
    Then o usuário "admin" de login "als2" não está mais na lista de usuários