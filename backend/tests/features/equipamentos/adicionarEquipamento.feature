Feature: As a usuario administrador
  I want to adicionar um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario: Adicionando equipamento usando patrimonio com sucesso
    Given nao existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Ar condicionado midea"
    And "descricao" com "Ar condicionado split de 12.000 btus"
    And "estado de conservacao" com "Bom"
    And "data de aquisicao" com "15/03/2023"
    And "valor estimado" com "R$ 1.200,00"
    And "patrimonio" com "1098642"
    Then eu envio uma resposta de "sucesso" com codigo "201"
    And o equipamento "Ar condicionado midea" com "patrimonio" "1098642" está no banco de dados

  Scenario: Adicionando equipamento usando numero de serie com sucesso
    Given nao existe o equipamento "Ar condicionado midea" com "numero de serie" "1098643"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Ar condicionado midea"
    And "descricao" com "Ar condicionado de 12.000 btus"
    And "estado de conservacao" com "Bom"
    And "data de aquisicao" com "15/03/2023"
    And "valor estimado" com "R$ 1.200,00"
    And "numero de serie" com "1098642"
    Then o equipamento "Ar condicionado midea" com "numero de serie" "1098642" está no banco de dados
    And eu envio uma resposta de "sucesso" com codigo "201"

