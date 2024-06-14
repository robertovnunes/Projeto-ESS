Feature: Listar reservas no banco de dados
  As a administrador
  I want to ver as reservas de sala no banco de dados
  So that eu posso confirmar ou negar as reservas

  Scenario: listando todas as reservas de sala
    Given que eu tenho reservas no banco de dados
    When eu recebo uma solicitação "/GET"
    Then eu devo ver todas as reservas de sala no banco de dados

  Scenario: listando todas as reservas de uma sala
    Given que eu tenho reservas para a sala "E428" no banco de dados
    When eu recebo uma solicitação "/GET/E428"
    Then eu envio uma resposta de "sucesso" com codigo "200"
    And json com todas as reservas da sala "E428"

  Scenario: listando reservas de uma sala sem reservas:
    Given que eu não tenho reservas para a sala "E428" no banco de dados
    When eu recebo uma solicitação "/GET/E428"
    Then eu envio uma resposta de "sucesso" com codigo "200"
    And json com todas as reservas da sala "E428" vazio