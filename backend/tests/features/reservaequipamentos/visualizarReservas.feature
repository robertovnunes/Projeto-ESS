Feature: Visualizar reservas de equipamentos
    Como um usuário
    Eu quero visualizar as reservas de equipamentos
    Para que eu possa saber quais equipamentos estão reservados

    Scenario: Visualizar reservas de equipamentos
      Given que existem "3" reservas de equipamentos:
      """
      {
        [
          {
            "id": "ggu4-8yt",
            "equipamento": "1098645604",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "responsavel": {"email":"joao@cin.ufpe.br","username":"joao"},
            "status": "pendente"
          },
          {
            "id": "8y1fwq1t",
            "equipamento": "04I6YMZgNpWM",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "responsavel": {"email":"jrvn@cin.ufpe.br","username":"robertovnunes"},
            "status": "confirmada"
          },
          {
            "id": "'121wd+q",
            "equipamento": "04I6YMZgNpWM",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-11-01",
            "responsavel": {"email":"maria@cin.ufpe.br","username":"maria"},
            "status": "em execução"
          },
          {
            "id": "wwjhkdh2",
            "equipamento": "1098646179",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "responsavel": {"email":"cpm22@cin.ufpe.br","username":"cpm22"},
            "status": "negada"
          }
        ]
      }
      """
      When eu recebo uma requisicao "/get/equipamentos/reservas" do usuario "joao" logado como "admin"
      Then eu retorno uma lista com as reservas de equipamentos
      """
      {
        [
          {
            "id": "ggu4-8yt",
            "equipamento": "1098645604",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "responsavel": {"joao@cin.ufpe.br","joao"},
            "status": "pendente"
          },
          {
            "id": "8y1fwq1t",
            "equipamento": "04I6YMZgNpWM",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "responsavel": {"jrvn@cin.ufpe.br","robertovnunes"},
            "status": "confirmada"
          },
          {
            "id": "'121wd+q",
            "equipamento": "04I6YMZgNpWM",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-11-01",
            "responsavel": {"maria@cin.ufpe.br","maria"},
            "status": "em execução"
          }
          {
            "id": "wwjhkdh2",
            "equipamento": "1098646179",
            "dataReserva": "2021-10-10",
            "dataInicio": "2021-10-13",
            "responsavel": {"cpm22@cin.ufpe.br","cpm22"},
            "status": "negada"
          }
        ]
      }
      """