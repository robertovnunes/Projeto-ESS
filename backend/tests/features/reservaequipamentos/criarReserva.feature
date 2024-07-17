Feature: Criar reservas de equipamento
    As a user
    I want to criar reservas de equipamento
    So I can utilizar equipamentos
  
    Scenario: Criar reserva de equipamento
        Given que existe o equipamento com id "1098645604"
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
            "reservas": [{
                "id": "ggu4-8yt",
                "equipamentoID": "1098645604",
                "dataReserva": "2021-10-10",
                "dataInicio": "2021-10-13",
                "responsavel": {"email":"joao@cin.ufpe.br","username":"joao"},
                "status": "pendente"
            }],
            "manutencao": []
        }
        """
        When eu recebo uma requisicao POST "/reservas/equipamentos/equipamento/1098645604" do usuario "joana" logado como "aluno" e json:
        """
        {
            "id": "enoq$ijq",
            "equipamentoID": "1098645604",
            "dataReserva": "2024-07-06",
            "dataInicio": "2022-07-23",
            "responsavel": {"email":"jmss@cin.ufpe.br","username":"joanamaria"},
            "status": "pendente"
        }
        """
        Then o codigo de resposta deve ser "201"
        And mensagem "Reserva criada com sucesso, pendente de confirmação"
