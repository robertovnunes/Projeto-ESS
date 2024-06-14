Feature: As a usuario administrador
  I want to adicionar um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario: Adicionando equipamento usando patrimonio com sucesso
    Given não existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admistrador"
    And a requisicao possui uma "insercao unica"
    And "nome" com "Ar condicionado midea"
    And "descricao" com "Ar condicionado split de 12.000 btus"
    And "estado de conservacao" com "Bom"
    And "data de aquisicao" com "15/03/2023"
    And "valor estimado" com "R$ 1.200,00"
    And "patrimonio" com "1098642"
    Then o equipamento "Ar condicionado midea" com "patrimonio" "1098642" está no banco de dados

  Scenario: Adicionando equipamento usando numero de serie com sucesso
    Given não existe o equipamento "Ar condicionado midea" com "numero de serie" "1098643"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admistrador"
    And a requisicao possui uma "insercao unica"
    And "nome" com "Ar condicionado midea"
    And "descricao" com "Ar condicionado de 12.000 btus"
    And "estado de conservacao" com "Bom"
    And "data de aquisicao" com "15/03/2023"
    And "valor estimado" com "R$ 1.200,00"
    And "numero de serie" com "1098642"
    Then o equipamento "Ar condicionado midea" com "numero de serie" "1098642" está no banco de dados

  Scenario Outline: Adicionando equipamentos em lote por numero de serie
    Given não existe o equipamento "arduino uno" com "numero de serie" "<numero_de_serie>"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admistrador"
    And a requisicao possui uma "insercao em lote"
    And "nome" com "arduino uno"
    And "descricao" com "Placa de prototipagem"
    And "estado de conservacao" com "Bom"
    And "data de aquisicao" com "15/03/2023"
    And "valor total estimado" com "R$ 1.200,00"
    And "quantidade" com "5"
    And os numeros de serie "<numero_de_serie>"
    Then os equipamentos "arduino uno" com numeros de serie "<numero_de_serie>" estão no banco de dados
    Examples:
    |numero_de_serie|
    |1098642|
    |1098643|
    |1098644|
    |1098645|
    |1098646|

  Scenario: Adicionar equipamento em lote com numero de série vazio
    Given não existe o equipamento "arduino uno" com "numero de serie" "<numero_de_serie>"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admistrador"
    And a requisicao possui uma "insercao em lote"
    And "nome" com "arduino uno"
    And "descricao" com "Placa de prototipagem"
    And "estado de conservacao" com "Bom"
    And "data de aquisicao" com "15/03/2023"
    And "valor total estimado" com "R$ 1.200,00"
    And "quantidade" com "5"
    And "numeros de serie" com " "
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Lista de numeros de serie vazia"