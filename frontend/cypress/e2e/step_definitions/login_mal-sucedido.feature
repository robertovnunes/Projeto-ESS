Feature: Login mal-sucedido

  Scenario: Login mal-sucedido de um usuario por credenciais Inválidas
    Given Eu visito a página "/login"
    When Eu preencho o campo "username" com "cfx"
    And Eu preencho o campo "password" com "12345678AAAA"
    And Eu escolho a opcao "Entrar"
    Then Eu continuo na página "/login"
    And Eu devo ver a mensagem "Credenciais Inválidas"

  Scenario: Login mal-sucedido de um usuario por dados não preenchidos
    Given Eu visito a página "/login"
    When Eu preencho o campo "username" com "cfx"
    And Eu deixo o campo "password" vazio
    And Eu escolho a opcao "Entrar"
    Then Eu continuo na página "/login"
    And O campo "password" deve exibir um erro