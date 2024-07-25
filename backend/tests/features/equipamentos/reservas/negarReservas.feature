Feature: negar reservas no banco de dados
  As a administrador
  I want to negar reservas de equipamento no banco de dados
  So that eu posso negar a reserva de equipamento

  Scenario: negar reserva de equipamento
    Given tenho uma reserva para "arduino" no banco de dados
    And a reserva está pendente
    When eu recebo uma solicitação "/PATCH" com o id da reserva
    And "ação" é igual a "negar"
    Then a reserva de equioamento é negada no banco de dados