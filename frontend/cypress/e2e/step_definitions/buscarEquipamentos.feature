Feature: Listar e buscar equipamentos
    Como um usuário
    Eu quero listar e buscar equipamentos
    Para que eu possa visualizar os equipamentos disponíveis

    Scenario: Listar todos os equipamentos
        Given existem os seguintes equipamentos cadastrados
        """
        [
           {
              "id": "1098646179",
              "nome": "Arduino",
              "descricao": "Placa de prototipação",
              "estado_conservacao": "reformado",
              "data_aquisicao": "10/04/2024",
              "valor_estimado": "R$ 200,00",
              "numero_serie": "1098646",
              "status": "em manutenção",
              "reservas": [],
              "manutencao": []
           },
           {
              "id": "04I6YMZgNpWM",
              "nome": "Monitor Phillips",
              "descricao": "Monitor de 19 polegadas",
              "estado_conservacao": "bom",
              "data_aquisicao": "15/03/2023",
              "valor_estimado": "R$ 1.200,00",
              "patrimonio": "5583159",
              "status": "reservado",
              "reservas": [],
              "manutencao": []
           }
        ]
        """
        When eu escolho "Consultar equipamento"
        Then eu vejo a lista de equipamentos
        """
        [
            {
                "nome": "Arduino",
                "descricao": "Placa de prototipação"
            },
            {
                "nome": "Monitor Phillips",
                "descricao": "Monitor de 19 polegadas"
            }
        ]
        """

    Scenario: Buscar equipamento por nome
        Given existe o seguinte equipamento cadastrado
        """
           {
              "id": "1098646179",
              "nome": "Arduino",
              "descricao": "Placa de prototipação",
              "estado_conservacao": "reformado",
              "data_aquisicao": "10/04/2024",
              "valor_estimado": "R$ 200,00",
              "numero_serie": "1098646",
              "status": "em manutenção",
              "reservas": [],
              "manutencao": []
           }
        """
        When eu escolho "Consultar equipamento"
        And eu busco por "Arduino"
        Then eu vejo a lista de equipamentos
        """
        [
            {
                "nome": "Arduino",
                "descricao": "Placa de prototipação"
            }
        ]
        """

    Scenario: Buscar equipamento por patrimonio
        Given existe o seguinte equipamento cadastrado
        """
           {
              "id": "04I6YMZgNpWM",
              "nome": "Monitor Phillips",
              "descricao": "Monitor de 19 polegadas",
              "estado_conservacao": "bom",
              "data_aquisicao": "15/03/2023",
              "valor_estimado": "R$ 1.200,00",
              "patrimonio": "5583159",
              "status": "reservado",
              "reservas": [],
              "manutencao": []
           }
        """
        When eu escolho "Consultar equipamento"
        And eu seleciono "Patrimônio"
        And eu busco por "5583159"
        Then eu vejo a lista de equipamentos
        """
        [
            {
                "nome": "Monitor Phillips",
                "descricao": "Monitor de 19 polegadas"
            }
        ]
        """

    Scenario: Buscar equipamento por numero de série
        Given existe o seguinte equipamento cadastrado
        """
           {
              "id": "1098646179",
              "nome": "Arduino",
              "descricao": "Placa de prototipação",
              "estado_conservacao": "reformado",
              "data_aquisicao": "10/04/2024",
              "valor_estimado": "R$ 200,00",
              "numero_serie": "1098646",
              "status": "em manutenção",
              "reservas": [],
              "manutencao": []
           }
        """
        When eu escolho "Consultar equipamento"
        And eu seleciono "Número de série"
        And eu busco por "1098646"
        Then eu vejo a lista de equipamentos
        """
        [
            {
                "nome": "Arduino",
                "descricao": "Placa de prototipação"
            }
        ]
        """

    Scenario: Buscar equipamento inexistente
        Given existem os seguintes equipamentos cadastrados
        """
        [
           {
              "id": "1098646179",
              "nome": "Arduino",
              "descricao": "Placa de prototipação",
              "estado_conservacao": "reformado",
              "data_aquisicao": "10/04/2024",
              "valor_estimado": "R$ 200,00",
              "numero_serie": "1098646",
              "status": "em manutenção",
              "reservas": [],
              "manutencao": []
           },
           {
              "id": "04I6YMZgNpWM",
              "nome": "Monitor Phillips",
              "descricao": "Monitor de 19 polegadas",
              "estado_conservacao": "bom",
              "data_aquisicao": "15/03/2023",
              "valor_estimado": "R$ 1.200,00",
              "patrimonio": "5583159",
              "status": "reservado",
              "reservas": [],
              "manutencao": []
           }
        ]
        """
        When eu escolho "Consultar equipamento"
        And eu busco por "Projetor"
        Then eu vejo a mensagem "Nenhum equipamento encontrado"
