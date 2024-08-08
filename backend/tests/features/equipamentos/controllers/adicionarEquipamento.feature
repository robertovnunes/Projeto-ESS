Feature: As a usuario administrador
  I want to adicionar um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario: Adicionando equipamento usando patrimonio com sucesso
    Given nao existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
     "nome": "Ar condicionado midea",
     "descricao": "Ar condicionado split de 12.000 btus",
     "estado_conservacao": "Bom",
     "data_aquisicao": "15/03/2023",
     "valor_estimado": "R$ 1.200,00",
     "patrimonio": "1098642"
    }
    """
    Then o equipamento "Ar condicionado midea" com "patrimonio" "1098642" está no banco de dados
    And eu envio uma resposta de sucesso com codigo "201"

  Scenario: Adicionando equipamento usando numero de serie com sucesso
    Given nao existe o equipamento "Ar condicionado philco" com "numero_serie" "1098643"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Ar condicionado philco",
      "descricao": "Ar condicionado split de 12.000 btus",
      "estado_conservacao": "Bom",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "numero_serie": "1098643"
    }
    """
    Then o equipamento "Ar condicionado philco" com "numero_serie" "1098643" está no banco de dados
    And eu envio uma resposta de sucesso com codigo "201"

  Scenario: Adicionando equipamento com nome vazio
    Given nao existe o equipamento "" com "patrimonio" "1098644"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "Bom",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "1098644"
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Campos vazios: Nome"

  Scenario: Adicionando equipamento com patrimonio vazio
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Ar condicionado philco",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "Bom",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": ""
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Campos vazios: Patrimônio"

  Scenario: Adicionando equipamento com numero de serie vazio
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Ar condicionado philco",
      "descricao": "Ar condicionado de 12.000 btus",
      "estado_conservacao": "Bom",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "numero_serie": ""
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Campos vazios: Numero de série"

  Scenario: Adicionando equipamento com patrimonio duplicado
    Given existe o equipamento com "patrimonio" "1098645"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Monitor phillips",
      "descricao": "monitor full hd",
      "estado_conservacao": "Bom",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "1098645"
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Erro ao criar equipamento: patrimônio já cadastrado"

  Scenario: Adicionando equipamento com numero de serie duplicado
    Given existe o equipamento com "numero_serie" "1098646"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Monitor phillips",
      "descricao": "monitor full hd",
      "estado_conservacao": "Bom",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "numero_serie": "1098646"
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Erro ao criar equipamento: numero de série já cadastrado"

  Scenario: Adicionando equipamento com descricao vazia
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583146"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Monitor phillips",
      "descricao": "",
      "estado_conservacao": "Bom",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "5583146"
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Campos vazios: Descrição"

  Scenario: Adicionando equipamento com estado de conservacao vazio
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583147"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Monitor phillips",
      "descricao": "Monitor de 19 polegadas",
      "estado_conservacao": "",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "5583147"
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Campos vazios: Estado de conservação"

  Scenario: Adicionando equipamento com data de aquisicao vazia
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583148"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Monitor phillips",
      "descricao": "Monitor de 19 polegadas",
      "estado_conservacao": "Bom",
      "data_aquisicao": "",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "5583147"
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Campos vazios: Data de aquisição"

#adicionar scenario outline em todos os cenarios
  Scenario: Adicionando equipamento com valor estimado vazio
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583149"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Monitor phillips",
      "descricao": "Monitor de 19 polegadas",
      "estado_conservacao": "Bom",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "",
      "patrimonio": "5583149"
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Campos vazios: Valor estimado"

  Scenario: Adicionando equipamento com estado de conservação não funcional
    Given nao existe o equipamento "Monitor phillips" com "patrimonio" "5583159"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
      "nome": "Monitor phillips",
      "descricao": "Monitor de 19 polegadas",
      "estado_conservacao": "Ruim",
      "data_aquisicao": "15/03/2023",
      "valor_estimado": "R$ 1.200,00",
      "patrimonio": "5583159"
    }
    """
    Then o equipamento "Monitor phillips" com "patrimonio" "5583159" está no banco de dados
    And eu envio uma resposta de sucesso com codigo "201"