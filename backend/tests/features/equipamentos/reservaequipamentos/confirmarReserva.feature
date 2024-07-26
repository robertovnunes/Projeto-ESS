Feature: Confirmar Reserva

  Scenario: Confirmar reserva de equipamento
    Given existe a reserva de "equipamento" com id "ggu4-8yt" para o equipamento com id "1098645604" pendente
    """
    {
      "id": "1098645604",
      "nome": "Arduino",
      "descricao": "Placa de prototipação",
      "estado_conservacao": "novo",
      "data_aquisicao": "10/04/2024",
      "valor_estimado": "R$ 200,00",
      "patrimonio": "1098645",
      "status": "disponivel",
      "reservas": [
         {
            "id": "ggu4-8yt",
            "equipamentoID": "1098645604",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "dataFim": "2021-10-28",
            "responsavel": {
               "email": "joao@cin.ufpe.br",
               "username": "joao"
            },
            "status": "pendente"
         }
      ],
      "manutencao": []
   }
    """
    When eu recebo uma requisicao PATCH "/reservas/equipamentos/ggu4-8yt" do usuario "sara" logado como "admin" e json:
    """
    {
      "status": "confirmada"
    }
    """
    Then a reserva de "equipamento" com id "ggu4-8yt" deve ser confirmada
    And o codigo de resposta deve ser "200"
    And mensagem "Reserva confirmada"

   Scenario: confirmar reserva de manutencao
    Given existe a reserva de "manutencao" com id "123456" para o equipamento com id "1098646179" pendente
    """
    {
      "id": "1098646179",
      "nome": "Arduino",
      "descricao": "Placa de prototipação",
      "estado_conservacao": "novo",
      "data_aquisicao": "10/04/2024",
      "valor_estimado": "R$ 200,00",
      "numero_serie": "1098646",
      "status": "em manutenção",
      "reservas": [
        {
          "id": "wwjhkdh2",
          "equipamentoID": "1098646179",
          "dataReserva": "2021-10-10",
          "dataInicio": "2021-10-13",
          "dataFim": "2021-10-28",
          "responsavel": {
             "email": "joao@cin.ufpe.br",
             "username": "joao"
          },
          "status": "pendente"
        }],
        "manutencao": [
          {
            "id": "123456",
            "equipamentoID": "1098646179",
            "dataFim": "2021-10-28",
            "responsavel": {
              "email": "carlos@cin.ufpe.br",
              "username": "carlos"
            },
            "funcao": "técnico",
            "depto": "oficina",
            "status": "pendente"
          }
        ]
    }
    """
    When eu recebo uma requisicao PATCH "/reservas/manutencao/123456" do usuario "carlos" logado como "admin" e json:
    """
    {
      "status": "confirmada"
    }
    """
    Then a reserva de "manutencao" com id "123456" deve ser confirmada
    And o codigo de resposta deve ser "200"
    And mensagem "Reserva confirmada"