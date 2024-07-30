Feature: Mostrar erro ao tentar responder sem validação

  Scenario: Mostrar erro ao tentar responder sem validação
    Given Eu estou logado como administrador
    When eu navego para a página "/comentarios"
    And eu clico no botão "Responder" no primeiro comentário não validado
    Then Eu devo ver a mensagem "ERRO, o comentário não pode ser respondido antes de ser validado."
