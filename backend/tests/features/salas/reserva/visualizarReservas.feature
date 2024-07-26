Feature: Visualizar reservas de equipamentos
    Como um usuário
    Eu quero visualizar as reservas de equipamentos
    Para que eu possa saber quais equipamentos estão reservados

    Scenario: Visualizar reservas de equipamentos
      Given que existem os seguintes equipamentos com reservas:
      """
      [
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
        },
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
                    "email": "cpm22@cin.ufpe.br",
                    "username": "cpm22"
                    },
                    "status": "pendente"
                }
            ],
            "manutencao": []
        },
        {
            "id": "04I6YMZgNpWM",
            "nome": "Monitor phillips",
            "descricao": "Monitor de 19 polegadas",
            "estado_conservacao": "bom",
            "data_aquisicao": "15/03/2023",
            "valor_estimado": "R$ 1.200,00",
            "patrimonio": "5583159",
            "status": "reservado",
            "reservas": [
                {
                    "id": "8y1fwq1t",
                    "equipamentoID": "04I6YMZgNpWM",
                    "dataReserva": "2021-10-10",
                    "dataInicio": "2021-10-13",
                    "dataFim": "2021-10-28",
                    "responsavel": {
                    "email": "jrvn@cin.ufpe.br",
                    "username": "robertovnunes"
                    },
                    "status": "confirmada"
                },
                {
                    "id": "'121wd+q",
                    "equipamentoID": "04I6YMZgNpWM",
                    "dataReserva": "2021-10-10",
                    "dataInicio": "2021-11-01",
                    "dataFim": "2021-11-15",
                    "responsavel": {
                    "email": "maria@cin.ufpe.br",
                    "username": "maria"
                    },
                    "status": "em execução"
                }
            ],
            "manutencao": []
        }
        ]
      """
      When eu recebo uma requisicao GET "/reservas/equipamentos" do usuario "joao" logado como "admin"
      Then eu retorno uma lista com as reservas de equipamentos e codigo "200"
      """
      [
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
        },
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
            "status": "pendente"
        },
        {
            "id": "8y1fwq1t",
            "equipamentoID": "04I6YMZgNpWM",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "dataFim": "2021-10-28",
            "responsavel": {
                "email": "jrvn@cin.ufpe.br",
                "username": "robertovnunes"
            },
            "status": "confirmada"
        },
        {
            "id": "'121wd+q",
            "equipamentoID": "04I6YMZgNpWM",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-11-01",
            "dataFim": "2021-11-15",
            "responsavel": {
                "email": "maria@cin.ufpe.br",
                "username": "maria"
            },
            "status": "em execução"
        }
      ]
      """

    Scenario: Visualizar reserva por id
        Given que a reserva de equipamento com id "ggu4-8yt" existe
        """
        {
            "id": "ggu4-8yt",
            "equipamentoID": "1098645604",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "dataFim": "2021-10-28",
            "responsavel": {"email":"joao@cin.ufpe.br","username":"joao"},
            "status": "pendente"
         }
        """
        When eu recebo uma requisicao GET "/reservas/equipamentos/ggu4-8yt" do usuario "joao" logado como "admin"
        Then eu retorno a reserva de equipamento e codigo "200"
        """
        {
            "id": "ggu4-8yt",
            "equipamentoID": "1098645604",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "dataFim": "2021-10-28",
            "responsavel": {"email":"joao@cin.ufpe.br","username":"joao"},
            "status": "pendente"
         }
        """
    
    Scenario: Visualizar reserva por id inexistente
        Given que a reserva de equipamento com id "25314789" nao existe
        When eu recebo uma requisicao GET "/reservas/equipamentos/25314789" do usuario "joao" logado como "admin"
        Then eu retorno uma mensagem "Reserva não encontrada" e codigo "404"

    Scenario: Visualizar reservas de um equipamento
        Given que o equipamento com id "04I6YMZgNpWM" possui as seguintes reservas:
        """
        [
            {
                "id": "8y1fwq1t",
                "equipamentoID": "04I6YMZgNpWM",
                "dataReserva": "2021-10-10",
                "dataInicio": "2021-10-13",
                "dataFim": "2021-10-28",
                "responsavel": {"email":"jrvn@cin.ufpe.br","username":"robertovnunes"},
                "status": "confirmada"
            },
            {
                "id": "'121wd+q",
                "equipamentoID": "04I6YMZgNpWM",
                "dataReserva": "2021-10-10",
                "dataInicio": "2021-11-01",
                "dataFim": "2021-11-15",
                "responsavel": {"email":"maria@cin.ufpe.br","username":"maria"},
                "status": "em execução"
            }
        ]
        """
        When eu recebo uma requisicao GET "/reservas/equipamentos/equipamento/04I6YMZgNpWM" do usuario "joao" logado como "admin"
        Then eu retorno uma lista com as reservas de equipamentos e codigo "200"
        """
        [
            {
                "id": "8y1fwq1t",
                "equipamentoID": "04I6YMZgNpWM",
                "dataReserva": "2021-10-10",
                "dataInicio": "2021-10-13",
                "dataFim": "2021-10-28",
                "responsavel": {"email":"jrvn@cin.ufpe.br","username":"robertovnunes"},
                "status": "confirmada"
            },
            {
                "id": "'121wd+q",
                "equipamentoID": "04I6YMZgNpWM",
                "dataReserva": "2021-10-10",
                "dataInicio": "2021-11-01",
                "dataFim": "2021-11-15",
                "responsavel": {"email":"maria@cin.ufpe.br","username":"maria"},
                "status": "em execução"
            }
        ]
        """

    Scenario: Visualizar reservas de um equipamento inexistente
        Given que nao existe o equipamento com id "25314789"
        When eu recebo uma requisicao GET "/reservas/equipamentos/equipamento/25314789" do usuario "joao" logado como "admin"
        Then eu retorno uma mensagem "Equipamento não encontrado" e codigo "404"