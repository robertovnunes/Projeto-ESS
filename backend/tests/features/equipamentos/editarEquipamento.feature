Feature: As a usuario
  I want to editar um equipamento no banco de dados
  So that eu posso modificar todos os recusros de uma sala

  Scenario Outline: Editar estado de conservação de um equipamento
    Given existe o equipamento: 
    """
    {
      "nome": "Ar condicionado midea",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado de conservacao": "novo",
      "data de aquisicao": "15/03/2023",
      "valor estimado": "R$ 1.200,00"
      "patrimonio": "1098642",
    }
    """
    When eu recebo uma requisição "/PATCH" do usuario "joao" logado como "admin"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado_conservação" "reformado"
    And "data_aquisição" "15/03/2023"
    And "valor_estimado" "R$ 1.200,00"
    And "patrimonio" "1098642"
    Then o equipamento "Ar condicionado midea" com patrimonio "1098642" é modificado no banco de dados
    And eu envio uma resposta de "sucesso" com codigo "200"
    And json atualizado do equipamentos "Ar condicionado midea" com patrimonio "1098642" é retornado
    
  Scenario: Editar um equipamento com nome vazio
    Given existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH" do usuario "joao" logado como "admin"
    And "nome" ""
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "reformado"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o equipamento "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um equipamento com patrimonio vazio
    Given existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH" do usuario "joao" logado como "admin"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "reformado"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio ""
    Then o equipamento "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um equipamento com descricao vazia
    Given existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH" do usuario "joao" logado como "admin"
    And "nome" "Ar condicionado midea"
    And "descricao" ""
    And "estado de conservação" "reformado"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o equipamento "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um equipamento com estado de conservação vazio
    Given existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH" do usuario "joao" logado como "admin"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" ""
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o equipamento "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um equipamento com data de aquisição vazia
    Given existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH" do usuario "joao" logado como "admin"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "reformado"
    And "data de aquisição" ""
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o equipamento "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um equipamento com valor estimado vazio
    Given existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH" do usuario "joao" logado como "admin"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "reformado"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" ""
    And patrimonio "1098642"
    Then o equipamento "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

