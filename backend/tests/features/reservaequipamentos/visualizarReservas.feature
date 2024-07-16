Feature: Visualizar reservas de equipamentos
    Como um usuário
    Eu quero visualizar as reservas de equipamentos
    Para que eu possa saber quais equipamentos estão reservados

    Scenario: Visualizar reservas de equipamentos
      Given que existem as seguintes reservas de equipamentos:
      """
      [
        {
            "id": "ggu4-8yt",
            "equipamentoID": "1098645604",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
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
            "responsavel": {
                "email": "cpm22@cin.ufpe.br",
                "username": "cpm22"
            },
            "status": "negada"
        },
        {
            "id": "8y1fwq1t",
            "equipamentoID": "04I6YMZgNpWM",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
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
            "responsavel": {
                "email": "maria@cin.ufpe.br",
                "username": "maria"
            },
            "status": "em execução"
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
            "responsavel": {
                "email": "cpm22@cin.ufpe.br",
                "username": "cpm22"
            },
            "status": "negada"
        },
        {
            "id": "8y1fwq1t",
            "equipamentoID": "04I6YMZgNpWM",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
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
                "responsavel": {"email":"jrvn@cin.ufpe.br","username":"robertovnunes"},
                "status": "confirmada"
            },
            {
                "id": "'121wd+q",
                "equipamentoID": "04I6YMZgNpWM",
                "dataReserva": "2021-10-10",
                "dataInicio": "2021-11-01",
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
                "responsavel": {"email":"jrvn@cin.ufpe.br","username":"robertovnunes"},
                "status": "confirmada"
            },
            {
                "id": "'121wd+q",
                "equipamentoID": "04I6YMZgNpWM",
                "dataReserva": "2021-10-10",
                "dataInicio": "2021-11-01",
                "responsavel": {"email":"maria@cin.ufpe.br","username":"maria"},
                "status": "em execução"
            }
        ]
        """

    Scenario: Visualizar reservas de um equipamento inexistente
        Given que nao existe o equipamento com id "25314789"
        When eu recebo uma requisicao GET "/reservas/equipamentos/equipamento/25314789" do usuario "joao" logado como "admin"
        Then eu retorno uma mensagem "Equipamento não encontrado" e codigo "404"