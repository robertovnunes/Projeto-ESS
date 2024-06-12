Feature: Buscar equipamentos
  As a usuário administrador
  I want procurar na lista de equipamentos
  So that eu possa ver, remover ou editar os equipamentos disponíveis nas salas

  Scenario: Listar todos os equipamentos
    Given que exitem equipamentos cadastrados no sistema
    When eu recebo uma requisição "/GET"
    Then eu retorno uma lista de equipamentos disponíveis

  Scenario: Listar todos os equipamentos de uma sala
    Given que exitem equipamentos cadastrados na sala "E428"
    When eu recebo uma requisição "/GET/E428"
    Then eu retorno uma lista de equipamentos disponíveis

  Scenario: buscar equipamento específico
    Given que exite o equipamento com id "123456" cadastrado na sala "E428"
    When eu recebo uma requisição "/GET/E428/123456"
    Then eu envio uma resposta de "sucesso" com codigo "200"
    And json com os dados do equipamento "Projetor epson"

  Scenario: Buscar equipamento inexistente
    Given que não existe o equipamento com id "654321" cadastrado na sala "E428"
    When eu recebo uma requisição "/GET/E428/654321"
    Then eu envio uma resposta de "erro" com codigo "404"
    And json com a mensagem "equipamento não encontrado"

  Scenario: Listar equipamentos de uma sala sem equipamentos
    Given que não existem equipamentos cadastrados na sala "E428"
    When eu recebo uma requisição "/GET/E428"
    Then eu retorno uma lista vazia

