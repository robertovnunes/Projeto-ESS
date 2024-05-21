Feature: Confirmar reservas no banco de dados
  As a administrador
  I want to confirmar reservas de sala no banco de dados
  So that eu posso confirmar a reserva

  Scenario: Confirmar reserva de sala
    Given tenho uma reserva para a sala "E248" no banco de dados
    And a reserva está pendente
    When eu recebo uma solicitação "/PATCH" com o id da reserva
    And "ação" é igual a "confirmar"
    Then a reserva de sala é confirmada no banco de dados