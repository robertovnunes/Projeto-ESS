Feature: As a usuario
  I want to editar um equipamento no banco de dados
  So that eu posso modificar todos os recusros de uma sala

  Scenario: Editar estado de conservação de um equipamento
    Given existe o equipamento: 
    """
    {
      "id": "a1b2c3d4",
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "novo",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "1098642",
      "reservas": [],
      "manutencao": []
    }
    """
    When eu recebo uma requisição "/PATCH" e id "a1b2c3d4" do usuario "joao" logado como "admin" e json
    """
    {
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "reformado",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "1098642"
    }
    """
    Then o equipamento "Ar condicionado midea" com "patrimonio" "1098642" é modificado no banco de dados para
    """
    {
      "id": "a1b2c3d4",
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "reformado",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "1098642",
      "reservas": [],
      "manutencao": []
    }
    """
    And eu envio uma resposta de "sucesso" com codigo "200"
    
  Scenario: Editar o patrimonio de um equipamento
    Given existe o equipamento: 
    """
    {
      "id": "a2b3c4d5",
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "novo",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "1098642",
      "reservas": [],
      "manutencao": []
    }
    """
    When eu recebo uma requisição "/PATCH" e id "a2b3c4d5" do usuario "joao" logado como "admin" e json
    """
    {
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservação": "novo",
      "data_aquisição": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "1098643"
    }
    """
    Then o equipamento "Ar condicionado midea" com "patrimonio" "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "O patrimonio de um equipamento não pode ser modificado" com codigo "400" 

  Scenario: Editar o numero de serie de um equipamento
    Given existe o equipamento: 
    """
    {
      "id": "a3b4c5d6",
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "novo",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "numero_serie": "1098642"
    }
    """
    When eu recebo uma requisição "/PATCH" e id "a3b4c5d6" do usuario "joao" logado como "admin" e json
    """
    {
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservação": "novo",
      "data_aquisição": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "numero_serie": "1098643"
    }
    """
    Then o equipamento "Ar condicionado midea" com "numero_serie" "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "O numero de serie de um equipamento não pode ser modificado" com codigo "400" 