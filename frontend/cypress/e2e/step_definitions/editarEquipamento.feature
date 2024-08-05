Feature: Editar equipamento cadastrado
  As a administrador
  I want to edit a equipment
  So I can change the equipment information

  Scenario: Editar equipamento
    Given que eu estou na página de "Gerenciar equipamentos"
    When eu escolho "Editar ou remover equipamento"
    Then eu devo ver a pagina "Buscar Equipamento"
    When eu procuro por "Arduino"
    #And clico na linha "Arduino"
    #Then eu devo ver os detalhes do equipamento
    #When eu escolho "Editar"
    #And eu preencho o campo "status" com "disponível"
    #And eu escolho "Salvar"
    #Then eu vejo o campo "status" com o valor "disponível"

