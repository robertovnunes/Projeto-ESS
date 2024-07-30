Feature: Admin validar e responder comentários

  Scenario: Exibir tabela de comentários
    Given Eu estou logado como administrador
    When eu navego para a página "/comentarios"
    Then Eu devo ver a tabela de comentários

  Scenario: Validar um comentário
    Given Eu estou logado como administrador
    When eu navego para a página "/comentarios"
    And eu clico no botão "Validar" no primeiro comentário
    Then Eu devo ver a mensagem "Comentário validado."

  Scenario: Responder a um comentário validado
    Given Eu estou logado como administrador
    When eu navego para a página "/comentarios"
    And eu clico no botão "Validar" no primeiro comentário
    And eu clico no botão "Responder" no primeiro comentário validado
    And eu escrevo "Esta é uma resposta de teste." na área de texto da resposta
    And eu clico no botão "Enviar" no pop-up de resposta
    Then Eu devo ver a mensagem "Resposta enviada."
