Feature: Negar solicitações de manutenção
  As a administrador
  I want to negar solicitações de manutenção
  So I can manter o controle sobre as solicitações

  Scenario: Negar solicitação de manutenção
    Given que existe "2" solicitações de manutenção para o equipamento "projetor"
    When eu negar a solicitação de manutenção "2" para o equipamento "projetor"
    Then eu preencho o motivo com "já existe uma solicitação em andamento"
    When eu confirmo a negação
    Then a solicitação é negada
    And o solicitante é notificado