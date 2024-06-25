Feature: Professor cria um comentário sobre a sala e envia para a ADM

  Scenario: Cria um comentário e envia para a ADM
    Given que eu estou logado como "professor" com login "acm" e senha "456"
    When eu envio uma requisição POST para "/comentarios" com o corpo:
      ""
      {"autor": "professor","login": "acm","comentario": "o computador da sala 3 não liga","destinatario": "ADM"}
      ""
    Then eu recebo uma resposta com a mensagem "comentário enviado para ADM"
    And o comentário "o computador da sala 3 não liga" é enviado para a Administração

Feature: Aluno cria um comentário sobre o equipamento

  Scenario: Envia comentário sobre o equipamento para a SEC responsável
    Given que eu estou logado como "aluno" com login "tns" e senha "789"
    When eu envio uma requisição POST para "/comentarios" com o corpo:
      ""
      {"autor": "aluno","login": "tns","comentario": "a impressora da sala 2 está com problemas","destinatario": "SEC","sec_responsavel": "secretaria de pos-grad"}
      ""
    Then eu recebo uma resposta com a mensagem "comentário enviado para SEC"
    And o comentário "a impressora da sala 2 está com problemas" é enviado para a SEC responsável "secretaria de pos-grad"




