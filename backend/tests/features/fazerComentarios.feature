Feature: Professor cria um comentário sobre a sala e envia para a ADM

  Scenario: Cria um comentário e envia para a ADM
    Given que eu estou logado como "professor" com login "acm" e senha "456"
    When eu envio uma requisição POST para "/comentarios" com o corpo:
      """
      {"autor": "professor","login": "acm","comentario": "o computador da sala 3 não liga","destinatario": "ADM"}
      """
    Then eu recebo uma resposta com a mensagem "comentário enviado para ADM"
    And o comentário "o computador da sala 3 não liga" é enviado para a Administração


