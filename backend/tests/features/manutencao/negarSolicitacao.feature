Feature: negar manutenção de equipamentono banco de dados
  As a administrador
  I want to negar manutenção de equipamento no banco de dados
  So that eu posso negar a manutenção de equipamento

  Scenario: negar manutenção de equipamento
    Given tenho uma manutenção de equipamento no banco de dados
    And a manutenção de equipamento está pendente
    When eu recebo uma solicitação "/PATCH" com o id da manutenção de equipamento
    And "ação" é igual a "negar"
    Then a manutenção de equipamento de sala é negada no banco de dados