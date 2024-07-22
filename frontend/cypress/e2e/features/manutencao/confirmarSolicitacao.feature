Feature: confirmar solicitações de manutenção
  As a administrador
  I want to verificar solicitações de manutenção
  So that I can confirmar solicitações de manutenção

  Scenario: Confirmar solicitação de manutenção
    Given que eu estou na pagina de "solicitações de manutenção"
    And existe uma solicitação de manutenção para o equipamento "Projetor epson"
    And a solicitação tem status "pendente"
    When eu confirmo a solicitação
    Then a solicitação é confirmada
    And o equipamento "Projetor epson" é marcado como "em manutenção"