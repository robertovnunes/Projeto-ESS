Feature: As a Administrador
  I want to remover recursos da lista de recursos de uma sala
  So that eu possa remover recursos que não são mais necessários

  Scenario: Remover recurso da lista de recursos de uma sala
    Given que eu estou na página de "detalhes de uma sala"
    When eu escolho "Remover" ao lado de um recurso
    Then eu devo ver uma mensagem de "sucesso"
    And o recurso deve ser removido da lista de recursos da sala

  Scenario: Remover recurso da lista de recursos de uma sala que não existe
    Given que eu estou na página de "detalhes de uma sala"
    When eu escolho "Remover" ao lado de um recurso que não existe
    Then eu devo ver uma mensagem de "erro"
    And o recurso não deve ser removido da lista de recursos da sala

  Scenario: Remover recurso sem estar na conta administrador
    Given que eu estou logado como "jrvn" como
    And que eu estou na página de "detalhes de uma sala"
    When eu escolho "Remover" ao lado de um recurso
    Then eu devo ver uma mensagem de "erro"
    And o recurso não deve ser removido da lista de recursos da sala
