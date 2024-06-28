Feature: negar reservas no banco de dados
  As a administrador
  I want to negar reservas de sala no banco de dados
  So that eu posso negar a reserva de sala

  Scenario: negar reserva de sala
    Given tenho uma reserva no banco de dados
    And a reserva está pendente
    When eu recebo uma solicitação "/PATCH" com o id da reserva
    And "ação" é igual a "negar"
    Then a reserva de sala é negada no banco de dados