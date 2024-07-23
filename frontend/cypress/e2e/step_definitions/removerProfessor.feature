Feature: Remover Professor

    Scenario: Deletar a conta de um usuário Professor
    Given Eu estou na página "/usuarios/professores"
    And o usuário de login "als2" está entre os usuários
    When Eu escolho a opção Deletar conta
    And o sistema exibe a mensagem "Tem certeza de que deseja deletar o Professor com login als2?"
    When Eu escolho a opção "Sim"
    Then o usuário "professor" de login "als2" não está mais na lista de usuários