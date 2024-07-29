Feature: Administrador valida os comentários e responde
  As a admin
  I want to be able to see the comments
  So that I can validate and respond to them

  Scenario: Vê os comentários e valida eles
    Given que eu estou logado como "administrador" com login "cz" e senha "123"
    When eu envio uma requisição GET para "/comentarios"
    Then eu recebo uma lista de comentários, incluindo o comentário "a sala 1 está com problemas" com o ID "12345"
    When eu envio uma requisição PATCH para "/comentarios/12345" com o corpo:
      """
      { "validado": true }
      """
    Then eu recebo uma resposta com a mensagem "comentário validado"
    And o comentário com o ID "12345" é marcado como validado


  Scenario: Tenta validar um comentário que não existe
    Given que eu estou logado como "administrador" com login "cz" e senha "123"
    When eu envio uma requisição PATCH para "/comentarios/99999" com o corpo:
      """
      { "validado": true }
      """
    Then eu recebo uma resposta com a mensagem "comentário não encontrado"
    And o status da resposta é 404


  Scenario: Vê os comentários e responde
    Given que eu estou logado como "administrador" com login "cz" e senha "123"
    When eu envio uma requisição GET para "/comentarios"
    Then eu recebo uma lista de comentários, incluindo o comentário "a sala 1 está com problemas" com o ID "12345" que está validado
    When eu envio uma requisição POST para "/comentarios/12345/respostas" com o corpo:
      """
      { "resposta": "iremos resolver o problema" }
      """
    Then eu recebo uma resposta com a mensagem "resposta enviada com sucesso"
    And a resposta "iremos resolver o problema" é associada ao comentário com o ID "12345"


  Scenario: Tenta responder um comentário que não existe
    Given que eu estou logado como "administrador" com login "cz" e senha "123"
    When eu envio uma requisição POST para "/comentarios/99999/respostas" com o corpo:
      """
      { "resposta": "iremos resolver o problema" }
      """
    Then eu recebo uma resposta com a mensagem "comentário não encontrado"
    And o status da resposta é 404
  
  Scenario: Tenta responder um comentário que não foi validado
    Given que eu estou logado como "administrador" com login "cz" e senha "123"
    When eu envio uma requisição GET para "/comentarios"
    Then eu recebo uma lista de comentários, incluindo o comentário "a sala 2 está com problemas" com o ID "67890" que não está validado
    When eu envio uma requisição POST para "/comentarios/67890/respostas" com o corpo:
      """
      { "resposta": "iremos resolver o problema" }
      """
    Then eu recebo uma resposta com a mensagem "comentário não validado"
    And o status da resposta é 400


  
    