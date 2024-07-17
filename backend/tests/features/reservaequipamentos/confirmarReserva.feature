Feature: Confirmar Reserva

  Scenario: Confirmar reserva de equipamento
    Given existe a reserva com id "ggu4-8yt" para o equipamento com id "1098645604" pendente
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
    When eu recebo uma requisicao PATCH "/reservas/equipamentos/id" do usuario "sara" logado como "admin" e json:
    """
    {
      "status": "confirmada"
    }
    """
    Then o codigo de resposta deve ser "200"
    And mensagem "Reserva confirmada com sucesso"