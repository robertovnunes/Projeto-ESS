Feature: Buscar recursos
  As a usuário administrador
  I want procurar na lista de recursos
  So that eu possa ver, remover ou editar os recursos disponíveis nas salas

  Scenario: Listar todos os recursos
    Given que exitem recursos cadastrados no sistema
    When eu recebo uma requisição "/GET"
    Then eu retorno uma lista de recursos disponíveis

  Scenario: Listar todos os recursos de uma sala
    Given que exitem recursos cadastrados na sala "E428"
    When eu recebo uma requisição "/GET/E428"
    Then eu retorno uma lista de recursos disponíveis

  Scenario: buscar recurso específico
    Given que exite o recurso com id "123456" cadastrado na sala "E428"
    When eu recebo uma requisição "/GET/E428/123456"
    Then eu envio uma resposta de "sucesso" com codigo "200"
    And json com os dados do recurso "Projetor epson"

  Scenario: Buscar recurso inexistente
    Given que não existe o recurso com id "654321" cadastrado na sala "E428"
    When eu recebo uma requisição "/GET/E428/654321"
    Then eu envio uma resposta de "erro" com codigo "404"
    And json com a mensagem "Recurso não encontrado"

  Scenario: Listar recursos de uma sala sem recursos
    Given que não existem recursos cadastrados na sala "E428"
    When eu recebo uma requisição "/GET/E428"
    Then eu retorno uma lista vazia

