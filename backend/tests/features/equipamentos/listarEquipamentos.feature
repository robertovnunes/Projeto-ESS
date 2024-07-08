Feature: Buscar equipamentos
  As a usuário administrador
  I want procurar na lista de equipamentos
  So that eu possa ver, remover ou editar os equipamentos disponíveis nas salas

  Scenario: Listar todos os equipamentos
    Given que exitem os seguintes equipamentos cadastrados no sistema:
    """
      [
        {
          "id": "04sk2GHcgYri",
          "nome": "Monitor philips",
          "descricao": "monitor full hd 24 polegadas OLED",
          "estado_conservacao": "reformado",
          "data_aquisicao": "15/03/2023",
          "valor_estimado": "R$ 1.200,00",
          "patrimonio": "5237418",
          "reservas": [],
          "manutencao": []
        },
        {
          "id": "04EGkIhCGohs",
          "nome": "Ar condicionado midea",
          "descricao": "Ar condicionado de 12.000 btus",
          "estado_conservacao": "novo",
          "data_aquisicao": "15/03/2023",
          "valor_estimado": "R$ 1.200,00",
          "numero_serie": "3642597",
          "reservas": [],
          "manutencao": []
        }
      ]
    """
    When eu recebo uma requisição GET para "/equipamentos" do usuario "joao" logado como "admin"
    Then eu retorno uma lista de equipamentos e json:
     """
      [
        {
          "id": "04sk2GHcgYri",
          "nome": "Monitor philips",
          "descricao": "monitor full hd 24 polegadas OLED",
          "estado_conservacao": "reformado",
          "data_aquisicao": "15/03/2023",
          "valor_estimado": "R$ 1.200,00",
          "patrimonio": "5237418",
          "reservas": [],
          "manutencao": []
        },
        {
          "id": "04EGkIhCGohs",
          "nome": "Ar condicionado midea",
          "descricao": "Ar condicionado de 12.000 btus",
          "estado_conservacao": "novo",
          "data_aquisicao": "15/03/2023",
          "valor_estimado": "R$ 1.200,00",
          "numero_serie": "3642597",
          "reservas": [],
          "manutencao": []
        }
      ]
    """

  Scenario: buscar equipamento específico por id
     Given que exite o equipamento com json cadastrado
     """
      {
        "id": "04sk2GHcgYri",
        "nome": "Monitor philips",
        "descricao": "monitor full hd 24 polegadas OLED",
        "estado_conservacao": "reformado",
        "data_aquisicao": "15/03/2023",
        "valor_estimado": "R$ 1.200,00",
        "patrimonio": "5237418",
        "reservas": [],
        "manutencao": []
      }
      """
      When eu recebo uma requisição GET para "/equipamentos/04sk2GHcgYri" do usuario "joao" logado como "admin"
      Then o json com os dados do equipamento com "id" "04sk2GHcgYri" é retornado
      """
      {
        "id": "04sk2GHcgYri",
        "nome": "Monitor philips",
        "descricao": "monitor full hd 24 polegadas OLED",
        "estado_conservacao": "reformado",
        "data_aquisicao": "15/03/2023",
        "valor_estimado": "R$ 1.200,00",
        "patrimonio": "5237418",
        "reservas": [],
        "manutencao": []
      }
      """

  Scenario: buscar equipamento específico por patrimonio
    Given que exite o equipamento com json cadastrado
    """
    {
      "id": "04sk2GHcgYri",
      "nome": "Monitor philips",
      "descricao": "monitor full hd 24 polegadas OLED",
      "estado_conservacao": "reformado",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "5237418",
      "reservas": [],
      "manutencao": []
    }
    """
    When eu recebo uma requisição GET para "/equipamentos/patrimonio/5237418" do usuario "joao" logado como "admin"
    Then o json com os dados do equipamento com "patrimonio" "5237418" é retornado
    """
    {
      "id": "04sk2GHcgYri",
      "nome": "Monitor philips",
      "descricao": "monitor full hd 24 polegadas OLED",
      "estado_conservacao": "reformado",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "5237418",
      "reservas": [],
      "manutencao": []
    }
    """

  Scenario: buscar equipamento específico por numero de serie
    Given que exite o equipamento com json cadastrado
    """
    {
      "id": "04EGkIhCGohs",
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "novo",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "numero_serie": "3642597",
      "reservas": [],
      "manutencao": []
    }
    """
    When eu recebo uma requisição GET para "/equipamentos/numero_serie/3642597" do usuario "joao" logado como "admin"
    Then o json com os dados do equipamento com "numero_serie" "3642597" é retornado
    """
    {
      "id": "04EGkIhCGohs",
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "novo",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "numero_serie": "3642597",
      "reservas": [],
      "manutencao": []
    }
    """

  Scenario Outline: Buscar equipamento por identificador inexistente
    Given que não existe o equipamento com <campo> <identificador>
    When eu recebo uma requisição GET para <endpoint> do usuario "joao" logado como "admin"
    Then eu envio uma resposta de erro com codigo "404" e mensagem "Equipamento nao encontrado"
    Examples:
    |campo|identificador|endpoint|
    |id|123d743s98|/equipamentos/123d743s98|
    |patrimonio|12345678|/equipamentos/patrimonio/12345678|
    |numero_serie|9876543|/equipamentos/numero_serie/9876543|
