Feature: Buscar recursos e equipamentos
  As a usuário administrador
  I want procurar na lista de recursos
  So that eu possa ver, remover ou editar os recursos disponíveis nas salas]

  Scenario: Listar todos os recursos
    Given que eu estou na página de "listagem de recursos"
    Then eu devo ver a lista de recursos cadastrados
    And eu devo ver o recurso "Projetor" na sala "E428"
    And eu devo ver o recurso "Computador" na sala "E428"
    And eu devo ver o recurso "TV" na sala "GRAD3"

  Scenario: Listar recursos de uma sala
    Given que eu estou na página de "detalhes" da sala "E428"
    When eu seleciono "Recursos" da sala "E428"
    Then eu devo ver a lista de recursos da sala "E428"
    And eu devo ver o recurso "Projetor"
    And eu devo ver o recurso "Computador"
    And eu devo ver o recurso "TV"
    And eu devo ver o recurso "Ar condicionado"

  Scenario: Listar recursos de uma sala sem recursos
    Given que eu estou na página de "listagem de salas"
    When eu seleciono "Recursos" da sala "E429"
    Then eu devo ver a lista de recursos da sala "E429"
    And eu devo ver a mensagem "Nenhum recurso disponível"

  Scenario: Buscar recursos por nome
    Given que eu estou na página de "listagem de recursos"
    When eu digito "Projetor" no campo de busca
    And eu escolho "procurar por nome"
    Then eu devo ver apenas o recurso "Projetor" na lista de recursos
    And eu devo ver o recurso "Projetor" na sala "E428"
    And eu devo ver o recurso "Projetor" na sala "D004"
    And eu devo ver o recurso "Projetor" na sala "D005"

  Scenario: Buscar recursos por patrimonio
    Given que eu estou na página de "listagem de recursos"
    When eu digito "123456" no campo de busca
    And eu escolho "procurar por patrimonio"
    Then eu devo ver apenas o recurso "Projetor" na lista de recursos
    And eu devo ver o recurso "Projetor" na sala "E428"

  Scenario: Buscar recursos por nome sem resultados
    Given que eu estou na página de "listagem de recursos"
    When eu digito "Mesa" no campo de busca
    And eu escolho "procurar por nome"
    Then eu devo ver a mensagem "Nenhum recurso encontrado"

  Scenario: Buscar recursos por patrimonio sem resultados
    Given que eu estou na página de "listagem de recursos"
    When eu digito "654321" no campo de busca
    And eu escolho "procurar por patrimonio"
    Then eu devo ver a mensagem "Nenhum recurso encontrado"

  Scenario: Buscar recursos de uma sala por nome
    Given que eu estou na página de "detalhes" da sala "E428"
    When eu seleciono "Recursos" da sala "E428"
    And eu digito "Projetor" no campo de busca
    And eu escolho "procurar por nome"
    Then eu devo ver apenas o recurso "Projetor" na lista de recursos da sala "E428"

  Scenario: Buscar recursos de uma sala por patrimonio
    Given que eu estou na página de "detalhes" da sala "E428"
    When eu seleciono "Recursos" da sala "E428"
    And eu digito "123456" no campo de busca
    And eu escolho "procurar por patrimonio"
    Then eu devo ver apenas o recurso "Projetor" na lista de recursos da sala "E428"

  Scenario: Buscar recursos de uma sala por nome sem resultados
    Given que eu estou na página de "detalhes" da sala "E428"
    When eu seleciono "Recursos" da sala "E428"
    And eu digito "Mesa" no campo de busca
    And eu escolho "procurar por nome"
    Then eu devo ver a mensagem "Nenhum recurso encontrado"

  Scenario: Buscar recursos de uma sala por patrimonio sem resultados
    Given que eu estou na página de "detalhes" da sala "E428"
    When eu seleciono "Recursos" da sala "E428"
    And eu digito "654321" no campo de busca
    And eu escolho "procurar por patrimonio"
    Then eu devo ver a mensagem "Nenhum recurso encontrado"