Feature: Login bem-sucedido

  Scenario: Login bem-sucedido de um administrador
    Given Eu visito a página "/login"
    When Eu preencho o campo "username" com "9472"
    And Eu preencho o campo "password" com "12345678"
    And Eu escolho a opcao "Entrar"
    Then Eu sou redirecionado para a página "/mainpage"
    And Eu devo ver a mensagem "Bem-vindo, Administrador!"

  Scenario: Login bem-sucedido de um aluno
    Given Eu visito a página "/login"
    When Eu preencho o campo "username" com "js3"
    And Eu preencho o campo "password" com "12345678"
    And Eu escolho a opcao "Entrar"
    Then Eu sou redirecionado para a página "/mainpage"
    And Eu devo ver a mensagem "Bem-vindo, Aluno!"

  Scenario: Login bem-sucedido de um professor
    Given Eu visito a página "/login"
    When Eu preencho o campo "username" com "cfx"
    And Eu preencho o campo "password" com "12345678"
    And Eu escolho a opcao "Entrar"
    Then Eu sou redirecionado para a página "/mainpage"
    And Eu devo ver a mensagem "Bem-vindo, Professor!"
