Feature: Editar recurso no banco de dados
  As a administrador
  I want to editar um recurso no banco de dados
  So that eu posso modificar todos os recusros de uma sala

  Scenario: Editar um recurso
    Given existe o recurso "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "reformado"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o recurso "Ar condicionado midea" com patrimonio "1098642" é modificado no banco de dados
    And eu envio uma resposta de "sucesso" com codigo "200"
    And json atualizado do recursos "Ar condicionado midea" com patrimonio "1098642" é retornado

  Scenario: Editar um recurso com nome vazio
    Given existe o recurso "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH"
    And "nome" ""
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "reformado"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o recurso "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um recurso com patrimonio vazio
    Given existe o recurso "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "reformado"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio ""
    Then o recurso "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um recurso com descricao vazia
    Given existe o recurso "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH"
    And "nome" "Ar condicionado midea"
    And "descricao" ""
    And "estado de conservação" "reformado"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o recurso "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um recurso com estado de conservação vazio
    Given existe o recurso "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" ""
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o recurso "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um recurso com data de aquisição vazia
    Given existe o recurso "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "reformado"
    And "data de aquisição" ""
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o recurso "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

  Scenario: Editar um recurso com valor estimado vazio
    Given existe o recurso "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/PATCH"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "reformado"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" ""
    And patrimonio "1098642"
    Then o recurso "Ar condicionado midea" com patrimonio "1098642" não é modificado no banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And json de erro é retornado

