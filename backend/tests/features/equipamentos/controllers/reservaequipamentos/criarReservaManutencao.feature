Feature: Criar reserva de manutencao
    As a user
    I want to criar reservas de manutencao
    So I can reparar equipamentos

    Scenario: Criar reserva de manutencao de equipamento disponivel
        Given que existe o equipamento com id "1098646179"
        """
        {
            "id": "1098646179",
            "nome": "Arduino",
            "descricao": "Placa de prototipação",
            "estado_conservacao": "novo",
            "data_aquisicao": "10/04/2024",
            "valor_estimado": "R$ 200,00",
            "numero_serie": "1098646",
            "status": "disponivel",
            "reservas": [],
            "manutencao": []
        }
        """
        When eu recebo uma requisicao POST "/reservas/equipamentos/manutencao" do usuario "carlos" logado como "admin" e json:
        """
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
        }
        """
        Then o codigo de resposta deve ser "201"
        And a o status da reserva é "confirmada"

    Scenario: Criar reserva de manutencao de equipamento reservado
        Given que existe o equipamento com id "3642789"
        """
        {
            "id": "3642789",
            "nome": "Arduino",
            "descricao": "Placa de prototipação",
            "estado_conservacao": "novo",
            "data_aquisicao": "10/04/2024",
            "valor_estimado": "R$ 200,00",
            "numero_serie": "1098646",
            "status": "reservado",
            "reservas": [
                {
                    "id": "ggu4-8yt",
                    "equipamentoID": "3642789",
                    "dataReserva": "2021-10-10",
                    "dataInicio": "2021-10-13",
                    "dataFim": "2021-10-28",
                    "responsavel": {"email":"joao@cin.ufpe.br","username":"joao"},
                    "status": "confirmada"
                }
            ],
            "manutencao": []
        }
        """
        When eu recebo uma requisicao POST "/reservas/equipamentos/manutencao" do usuario "carlos" logado como "admin" e json:
        """
        {
            "id": "123456",
            "equipamentoID": "3642789",
            "dataFim": "2021-10-28",
            "responsavel": {
              "email": "carlos@cin.ufpe.br",
              "username": "carlos"
            },
            "funcao": "técnico",
            "depto": "oficina",
        }
        """
        Then o codigo de resposta deve ser "201"
        And a o status da reserva é "pendente"