Feature: As a usuario
  I want to adicionar um equipamento ao banco de dados
  So that eu posso armazenar todos os equipamentos no sistema

  Scenario: Adicionando equipamento com sucesso
    Given não existe o equipamento "Ar condicionado midea" com patrimonio 1098642
    When eu recebo uma requisição "/POST"
    And nome "Ar condicionado midea"
    And descricao "Ar condicionado de 12.000 btus"
    And estado de conservação "Novo"
    And data de aquisição "15/03/2023"
    And valor estimado "R$ 1.200,00"
    And patrimonio 1098642
    Then o equipamento "Ar condicionado midea" com patrimonio 1098642 está no banco de dados

  Scenario: Adicionando equipamento com nome vazio
    Given eu recebo uma requisição "/POST"
    And nome ""
    And descricao "Ar condicionado de 12.000 btus"
    And estado de conservação "Bom"
    And data de aquisição "15/03/2023"
    And valor estimado "R$ 1.200,00"
    And patrimonio 1098642
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Nome não pode ser vazio"

  Scenario: Adicionando equipamento com patrimonio vazio
    Given eu recebo uma requisição "/POST"
    And nome "Ar condicionado midea"
    And descricao "Ar condicionado de 12.000 btus"
    And estado de conservação "Bom"
    And data de aquisição "15/03/2023"
    And valor estimado "R$ 1.200,00"
    And patrimonio ""
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Patrimonio não pode ser vazio"

  Scenario: Adicionando equipamento com patrimonio duplicado
    Given existe o equipamento "Monitor phillips" com patrimonio 5583147
    When eu recebo uma requisição "/POST"
    And nome "Monitor phillips"
    And descricao "Monitor de 19 polegadas"
    And estado de conservação "Bom"
    And data de aquisição "15/03/2023"
    And valor estimado "R$ 1.200,00"
    And patrimonio "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Patrimonio já cadastrado"

  Scenario: Adicionando equipamento com descricao vazia
    Given eu recebo uma requisição "/POST"
    And nome "Monitor phillips"
    And descricao ""
    And estado de conservação "Bom"
    And data de aquisição "15/03/2023"
    And valor estimado "R$ 1.200,00"
    And patrimonio "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Descrição não pode ser vazia"

  Scenario: Adicionando equipamento com estado de conservação vazio
    Given eu recebo uma requisição "/POST"
    And nome "Monitor phillips"
    And descricao "Monitor de 19 polegadas"
    And estado de conservação ""
    And data de aquisição "15/03/2023"
    And valor estimado "R$ 1.200,00"
    And patrimonio "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Estado de conservação não pode ser vazio"

  Scenario: Adicionando equipamento com data de aquisição vazia
    Given eu recebo uma requisição "/POST"
    And nome "Monitor phillips"
    And descricao "Monitor de 19 polegadas"
    And estado de conservação "Bom"
    And data de aquisição ""
    And valor estimado "R$ 1.200,00"
    And patrimonio "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Data de aquisição não pode ser vazia"

  Scenario: Adicionando equipamento com valor estimado vazio
    Given eu recebo uma requisição "/POST"
    And nome "Monitor phillips"
    And descricao "Monitor de 19 polegadas"
    And estado de conservação "Bom"
    And data de aquisição "15/03/2023"
    And valor estimado ""
    And patrimonio "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Valor estimado não pode ser vazio"

  Scenario: Adicionando equipamento com estado de conservação não funcional
    Given eu recebo uma requisição "/POST"
    And nome "Monitor phillips"
    And descricao "Monitor de 19 polegadas"
    And estado de conservação "Não funcional"
    And data de aquisição "15/03/2023"
    And valor estimado "R$ 1.200,00"
    And patrimonio "5583147"
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "Estado de conservação inválido"

  Scenario: Adicionando equipamento duplicado
    Given existe o equipamento "Monitor phillips" com patrimonio 5583147
    When eu recebo uma requisição "/POST"
    And nome "Monitor phillips"
    And descricao "Monitor de 19 polegadas"
    And estado de conservação "Bom"
    And data de aquisição "15/03/2023"
    And valor estimado "R$ 1.200,00"
    And patrimonio 5583147
    Then eu envio uma resposta de "erro" com codigo "404"
    And mensagem "equipamento já cadastrado"

