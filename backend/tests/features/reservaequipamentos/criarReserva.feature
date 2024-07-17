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
                "dataFim": "2021-10-28",
                "responsavel": {"email":"joao@cin.ufpe.br","username":"joao"},
                "status": "pendente"
            }],
            "manutencao": []
        }
        """
        When eu recebo uma requisicao POST "/reservas/equipamentos/" do usuario "joana" logado como "aluno" e json:
        """
        {
            "equipamentoID": "1098645604",
            "dataReserva": "2024-07-06",
            "dataInicio": "2024-07-23",
            "responsavel": {"email":"jmss@cin.ufpe.br","username":"joanamaria"}
        }
        """
        Then o codigo de resposta deve ser "201"
        And mensagem "Reserva criada com sucesso, pendente de confirmação"

    Scenario: Criar reserva de equipamento com estado de conservação não funcional
        Given que existe o equipamento com id "1098645685"
        """
        {
            "id": "1098645685",
            "nome": "Arduino",
            "descricao": "Placa de prototipação",
            "estado_conservacao": "nao_funcional",
            "data_aquisicao": "10/04/2024",
            "valor_estimado": "R$ 200,00",
            "numero_serie": "1098645",
            "status": "disponivel",
            "reservas": [],
            "manutencao": []
        }
        """
        When eu recebo uma requisicao POST "/reservas/equipamentos" do usuario "marcela" logado como "aluno" e json:
        """
        {
            "equipamentoID": "1098645685",
            "dataReserva": "2024-07-06",
            "dataInicio": "2024-07-23",
            "responsavel": {"email":"marcela@email.com","username":"marcela"}
        }
        """
        Then o codigo de resposta deve ser "400"
        And mensagem "Este equipamento não está funcional"

    Scenario: Criar reserva de equipamento com status em manutenção
        Given que existe o equipamento com id "1098645635"
        """
        {
            "id": "1098645635",
            "nome": "Arduino",
            "descricao": "Placa de prototipação",
            "estado_conservacao": "novo",
            "data_aquisicao": "10/04/2024",
            "valor_estimado": "R$ 200,00",
            "patrimonio": "1094645",
            "status": "em_manutencao",
            "reservas": [],
            "manutencao": []
        }
        """
        When eu recebo uma requisicao POST "/reservas/equipamentos" do usuario "jose" logado como "aluno" e json:
        """
        {
            "equipamentoID": "1098645635",
            "dataReserva": "2024-07-06",
            "dataInicio": "2022-07-23",
            "responsavel": {"email":"jose@email.com","username":"jose"}
        }
        """
        Then o codigo de resposta deve ser "400"
        And mensagem "Este equipamento está em manutenção"

    Scenario: Criar reserva de equipamento para data já com reserva confirmada
        Given que existe o equipamento com id "1098645335"
        """
        {
            "id": "1098645335",
            "nome": "Arduino",
            "descricao": "Placa de prototipação",
            "estado_conservacao": "novo",
            "data_aquisicao": "10/04/2024",
            "valor_estimado": "R$ 200,00",
            "numero_serie": "1004645",
            "status": "disponivel",
            "reservas": [{
                "id": "ggu4-8yt",
                "equipamentoID": "1098645635",
                "dataReserva": "2021-10-01",
                "dataInicio": "2021-10-13",
                "dataFim": "2021-10-28",
                "responsavel": {"email":"carlos@email.com","username":"carlos"},
                "status": "confirmada"
            }],
            "manutencao": []
        }
        """
        When eu recebo uma requisicao POST "/reservas/equipamentos" do usuario "jose" logado como "aluno" e json:
        """
        {
            "equipamentoID": "1098645335",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "responsavel": {"email":"jose@email.com","username":"jose"}
        }
        """
        Then o codigo de resposta deve ser "400"
        And mensagem "Este equipamento não está disponível para reserva neste período"