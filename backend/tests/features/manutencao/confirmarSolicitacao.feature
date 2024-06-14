Feature: Confirmar manutenção no banco de dados
  As a administrador
  I want to confirmar manutenção de equipamentos no banco de dados
  So that eu posso confirmar a manutenção de equipamento

  Scenario: Confirmar manutenção de equipamento
    Given tenho uma manutenção no banco de dados
    And a manutenção está pendente
    When eu recebo uma solicitação "/PATCH" com o id da manutenção
    And "ação" é igual a "confirmar"
    Then a manutenção de equipamento é confirmada no banco de dados