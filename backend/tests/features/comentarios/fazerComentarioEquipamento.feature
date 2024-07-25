Feature: Aluno cria um comentário sobre o equipamento

  Scenario: Envia comentário sobre o equipamento para a SEC responsável
    Given que eu estou logado como "aluno" com login "tns" e senha "789"
    When eu envio uma requisição POST para "/comentarios" com o corpo:
      """
      {"autor": "aluno","login": "tns","comentario": "a impressora da sala 2 está com problemas","destinatario": "SEC","sec_responsavel": "secretaria de pos-grad"}
      """
    Then eu recebo uma resposta com a mensagem "comentário enviado para SEC"
    And o comentário "a impressora da sala 2 está com problemas" é enviado para a SEC responsável "secretaria de pos-grad"
