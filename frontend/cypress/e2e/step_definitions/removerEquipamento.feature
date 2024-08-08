Feature: Remover equipamentos
  As a usuário administrador
  I want to remover equipamentos
  So I can remove equipamentos from the system

  Scenario: Remover equipamento
    Given que eu estou na pagina de gerenciar equipamentos
    When eu escolho "Editar ou remover equipamento"
    Then eu devo ver a lista de equipamentos
    When eu clico em "Arduino"
    And eu clico no botão "Remover"
    And eu clico no botão "Sim"
    Then eu devo ver a mensagem "Equipamento removido com sucesso"