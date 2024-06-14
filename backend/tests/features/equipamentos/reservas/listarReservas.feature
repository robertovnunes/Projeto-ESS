Feature: Listar reservas no banco de dados
  As a administrador
  I want to ver as reservas de equipamento no banco de dados
  So that eu posso confirmar ou negar as reservas

  Scenario: listando todas as reservas de equipamento
    Given que eu tenho reservas no banco de dados
    When eu recebo uma solicitação "/GET"
    Then eu devo ver todas as reservas de equipamento no banco de dados

  Scenario: listando todas as reservas de uma equipamento
    Given que eu tenho reservas para o equipamento "Arduino" no banco de dados
    When eu recebo uma solicitação "/GET/arduino"
    Then eu envio uma resposta de "sucesso" com codigo "200"
    And json com todas as reservas do equipamento "arduino"

  Scenario: listando reservas de uma equipamento sem reservas:
    Given que eu não tenho reservas para o equipamento "arduino" no banco de dados
    When eu recebo uma solicitação "/GET/arduino"
    Then eu envio uma resposta de "sucesso" com codigo "200"
    And json com todas as reservas do equipamento "E428" vazio