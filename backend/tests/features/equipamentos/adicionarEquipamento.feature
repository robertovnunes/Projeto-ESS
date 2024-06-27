Feature: As a usuario administrador
  I want to adicionar um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario: Adicionando equipamento usando patrimonio com sucesso
    Given nao existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Ar condicionado midea"
    And "descricao" com "Ar condicionado split de 12.000 btus"
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "patrimonio" com "1098642"
    Then o equipamento "Ar condicionado midea" com "patrimonio" "1098642" está no banco de dados
    And eu envio uma resposta de "sucesso" com codigo "201"

  Scenario: Adicionando equipamento usando numero de serie com sucesso
    Given nao existe o equipamento "Ar condicionado philco" com "numero_serie" "1098643"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Ar condicionado philco"
    And "descricao" com "Ar condicionado split de 12.000 btus"
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "numero_serie" com "1098643"
    Then o equipamento "Ar condicionado philco" com "numero_serie" "1098643" está no banco de dados
    And eu envio uma resposta de "sucesso" com codigo "201"

  Scenario: Adicionando equipamento com nome vazio
    Given nao existe o equipamento com "patrimonio" "1098642"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com ""
    And "descricao" com "Ar condicionado split de 12.000 btus"
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "patrimonio" com "1098642"
    Then eu envio uma resposta de "erro" com codigo "400" e mensagem "Nome nao informado"

  Scenario: Adicionando equipamento com patrimonio vazio
    Given eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Ar condicionado midea"
    And "descricao" com "Ar condicionado de 12.000 btus"
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "patrimonio" com ""
    Then eu envio uma resposta de "erro" com codigo "400" e mensagem "Patrimonio nao informado"

  Scenario: Adicionando equipamento com numero de serie vazio
    Given eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Ar condicionado philco"
    And "descricao" com "Ar condicionado de 12.000 btus"
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "numero_serie" com ""
    Then eu envio uma resposta de "erro" com codigo "400" e mensagem "Numero de serie nao informado"

  Scenario: Adicionando equipamento com patrimonio duplicado
    Given existe o equipamento com "patrimonio" "1098643"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Projetor epson"
    And "descricao" com "projetor full hd"
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "patrimonio" com "1098643"
    Then eu envio uma resposta de "erro" com codigo "400" e mensagem "Já existe um equipamento com este patrimônio"

  Scenario: Adicionando equipamento com numero de serie duplicado
    Given existe o equipamento com "numero_serie" "1098643"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Projetor epson"
    And "descricao" com "projetor full hd"
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "numero_serie" com "1098643"
    Then eu envio uma resposta de "erro" com codigo "400" e mensagem "Já existe um equipamento com este numero de serie"

  Scenario: Adicionando equipamento com descricao vazia
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583147"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Monitor phillips"
    And "descricao" com ""
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "patrimonio" com "5583147"
    Then eu envio uma resposta de "erro" com codigo "400" e mensagem "Descriçao nao informada"

  Scenario: Adicionando equipamento com estado de conservacao vazio
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583147"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Monitor phillips"
    And "descricao" com "Monitor de 19 polegadas"
    And "estado_conservacao" com ""
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "patrimonio" com "5583147"
    Then eu envio uma resposta de "erro" com codigo "400" e mensagem "Estado de conservaçao nao informado"

  Scenario: Adicionando equipamento com data de aquisicao vazia
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583147"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Monitor phillips"
    And "descricao" com "Monitor de 19 polegadas"
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com ""
    And "valor_estimado" com "R$ 1.200,00"
    And "patrimonio" com "5583147"
    Then eu envio uma resposta de "erro" com codigo "400" e mensagem "Data de aquisiçao nao informada"

#adicionar scenario outline em todos os cenarios
  Scenario: Adicionando equipamento com valor estimado vazio
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583147"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Monitor phillips"
    And "descricao" com "Monitor de 19 polegadas"
    And "estado_conservacao" com "Bom"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com ""
    And "patrimonio" com "5583147"
    Then eu envio uma resposta de "erro" com codigo "400" e mensagem "Valor estimado nao informado"

  Scenario: Adicionando equipamento com estado de conservação não funcional
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583147"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin"
    And "nome" com "Monitor phillips"
    And "descricao" com "Monitor de 19 polegadas"
    And "estado_conservacao" com "não funcional"
    And "data_aquisicao" com "15/03/2023"
    And "valor_estimado" com "R$ 1.200,00"
    And "numero_serie" com "5583147"
    Then o equipamento "Monitor phillips" com "numero_serie" "5583147" está no banco de dados
    And eu envio uma resposta de "sucesso" com codigo "201"