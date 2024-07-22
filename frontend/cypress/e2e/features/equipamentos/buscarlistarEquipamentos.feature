Feature: buscar e listar equipamentos no sistema
  As a administrador
  I want to buscar e listar equipamentos no sistema
  So that eu possa visualizar todos os equipamentos cadastrados

  Scenario: buscar equipamento por nome
    Given que eu tenho um equipamento cadastrado com o nome "Notebook"
    When eu busco por "Notebook"
    Then eu devo ver o equipamento "Notebook" na lista de equipamentos

  Scenario: buscar equipamento por nome inexistente
    Given que eu tenho um equipamento cadastrado com o nome "Notebook"
    When eu busco por "Celular"
    Then eu não devo ver o equipamento "Celular" na lista de equipamentos

  Scenario: buscar equipamento por patrimonio
    Given que eu tenho um equipamento "projetor" cadastrado com o patrimonio "123456"
    When eu busco por "123456"
    Then eu devo ver "projetor" na lista de equipamentos

  Scenario: buscar equipamento por patrimonio inexistente
    Given que eu tenho um equipamento "projetor" cadastrado com o patrimonio "123456"
    When eu busco por "654321"
    Then eu não devo ver "projetor" na lista de equipamentos