Feature: As a usuario
  I want to adicionar um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario: Adicionando equipamento com patrimonio com sucesso
    Given não existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/POST" do usuario "joao" logado como "admistrador"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then o equipamento "Ar condicionado midea" com patrimonio "1098642" está no banco de dados

  Scenario: Adicionando equipamento com numero de serie com sucesso
    Given não existe o equipamento "Ar condicionado midea" com "patrimonio" "1098642"
    When eu recebo uma requisição "/POST" do usuario "joao" logado como "admistrador"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "numero de serie" "1098642"
    Then o equipamento "Ar condicionado midea" com patrimonio "1098642" está no banco de dados

  Scenario outline: Adicionando equipamentos em lote por numero de serie
    Given eu recebo uma requisição "/POST" do usuario "joao" logado como "admistrador"
    And a requisição possui uma lista de numeros de série
    When os dados são verificados como "nome" "arduino uno"
    And "descricao" "Placa de prototipagem"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "quantidade" "5"
    And "numeros de serie" "numero de serie"
    |numero de serie|
    |1098642|
    |1098643|
    |1098644|
    |1098645|
    |1098646|
    Then os equipamentos "arduino uno" com numeros de serie "1098642, 1098643, 1098644, 1098645, 1098646" estão no banco de dados


  Scenario: Adicionando equipamento com nome vazio
    Given eu recebo uma requisição "/POST"
    And "nome" ""
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And patrimonio "1098642"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Nome não pode ser vazio"

  Scenario: Adicionando equipamento sem partimonio
    Given eu recebo uma requisição "/POST"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "patrimonio" ""
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Patrimonio não pode ser vazio"

  Scenario: Adicionando equipamento sem numero de serie
    Given eu recebo uma requisição "/POST"
    And "nome" "Ar condicionado midea"
    And "descricao" "Ar condicionado de 12.000 btus"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "numero de serie" ""
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Numero de série não pode ser vazio"

  Scenario: Adicionando equipamento com partimonio duplicado
    Given existe o equipamento "Monitor phillips" com "patrimonio" "5583147"
    When eu recebo uma requisição "/POST"
    And "nome" "Monitor phillips"
    And "descricao" "Monitor de 19 polegadas"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "patrimonio" "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Patrimonio já cadastrado"

  Scenario: Adicionando equipamento com descricao vazia
    Given eu recebo uma requisição "/POST"
    And "nome" "Monitor phillips"
    And "descricao" ""
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "patrimonio" "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Descrição não pode ser vazia"

  Scenario: Adicionando equipamento com estado de conservação vazio
    Given eu recebo uma requisição "/POST"
    And "nome" "Monitor phillips"
    And "descricao" "Monitor de 19 polegadas"
    And "estado de conservação" ""
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "patrimonio" "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Estado de conservação não pode ser vazio"

  Scenario: Adicionando equipamento com data de aquisição vazia
    Given eu recebo uma requisição "/POST"
    And "nome" "Monitor phillips"
    And "descricao" "Monitor de 19 polegadas"
    And "estado de conservação" "Bom"
    And "data de aquisição" ""
    And "valor estimado" "R$ 1.200,00"
    And "patrimonio" "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Data de aquisição não pode ser vazia"

  Scenario: Adicionando equipamento com valor estimado vazio
    Given eu recebo uma requisição "/POST"
    And "nome" "Monitor phillips"
    And "descricao" "Monitor de 19 polegadas"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" ""
    And "patrimonio" "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Valor estimado não pode ser vazio"

  Scenario: Adicionando equipamento com estado de conservação não funcional
    Given eu recebo uma requisição "/POST"
    And "nome" "Monitor phillips"
    And "descricao" "Monitor de 19 polegadas"
    And "estado de conservação" "Não funcional"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "patrimonio" "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Estado de conservação inválido"

  Scenario: Adicionando equipamento duplicado
    Given existe o equipamento "Monitor phillips" com "patrimonio" "5583147"
    When eu recebo uma requisição "/POST"
    And "nome" "Monitor phillips"
    And "descricao" "Monitor de 19 polegadas"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "patrimonio" "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "equipamento já cadastrado"

  Scenario: Adicionando equipamento com quantidade insuficiente
    Given que a sala "E248" não possui o equipamento "Cadeiras"
    And a "capacidade" da sala "E248" é "40"
    When eu recebo uma requisição "/POST" para a sala "E248"
    And "nome" "Cadeiras"
    And "descricao" "Cadeira com apoio estudante"
    And "estado de conservação" "Bom"
    And "data de aquisição" "15/03/2023"
    And "valor estimado" "R$ 1.200,00"
    And "patrimonio" "5583147"
    And "quantidade" "30"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Quantidade menor que a capacidade"