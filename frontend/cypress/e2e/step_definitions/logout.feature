Feature: Logout

  Scenario: Logout bem-sucedido de um usuário
    Given Eu estou logado como "cfx" com a senha "12345678"
    When Eu clico no ícone do usuário
    And Eu escolho a opcao "Sair"
    Then Eu sou redirecionado para a página "/login"