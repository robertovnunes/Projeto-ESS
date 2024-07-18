Feature: negar Reserva

  Scenario: negar reserva de equipamento
    Given existe a reserva com id "wwjhkdh2" para o equipamento com id "1098646179" pendente
    """
    {
       "id": "1098646179",
      "nome": "Arduino",
      "descricao": "Placa de prototipação",
      "estado_conservacao": "novo",
      "data_aquisicao": "10/04/2024",
      "valor_estimado": "R$ 200,00",
      "numero_serie": "1098646",
      "status": "em_manutencao",
      "reservas": [
         {
            "id": "wwjhkdh2",
            "equipamentoID": "1098646179",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "dataFim": "2021-10-28",
            "responsavel": {
               "email": "cpm22@cin.ufpe.br",
               "username": "cpm22"
            },
            "status": "Pendente"
         }
      ],
      "manutencao": []
    }
    """
    When eu recebo uma requisicao PATCH "/reservas/equipamentos/wwjhkdh2" do usuario "sara" logado como "admin" e json:
    """
    {
      "status":{
        "status": "negada",
        "justificativa": "Equipamento em manutenção"
      }
    }
    """
    Then a reserva com id "wwjhkdh2" é negada no banco de dados para
    """
     {
        "id": "wwjhkdh2",
        "equipamentoID": "1098646179",
        "dataReserva": "2021-10-10",
        "dataInicio": "2021-10-13",
        "dataFim": "2021-10-28",
        "responsavel": {
           "email": "cpm22@cin.ufpe.br",
           "username": "cpm22"
        },
        "status": "negada/Equipamento em manutenção"
     }
    """
    And o codigo de resposta deve ser "200"
    And mensagem "Reserva negada/Equipamento em manutenção"