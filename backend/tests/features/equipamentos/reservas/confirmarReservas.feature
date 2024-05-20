Feature: Confirmar reservas de equipamento no banco de dados
  As a administrador
  I want to confirmar reservas de equipamento no banco de dados
  So that eu posso confirmar a reserva

  Scenario: Confirmar reserva de equipamento
    Given tenho uma reserva de equipamento no banco de dados
    And a reserva está pendente
    When eu recebo uma solicitação "/PATCH" com o id da reserva
    And "ação" é igual a "confirmar"
    Then a reserva de equipamento é confirmada no banco de dados