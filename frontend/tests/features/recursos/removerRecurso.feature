Feature: As a user
  I want to remover recursos da lista de recursos de uma sala
  So that eu possa remover recursos que não são mais necessários

  Scenario: Remover recurso da lista de recursos de uma sala
    Given que eu estou logado como "Gisely" como "administrador"
    And que eu estou na página de "detalhes" da sala "E428"
    When eu escolho "Remover" ao lado do recurso "camera logitech"
    Then eu devo ver uma mensagem de "confirmação"
    When eu escolho "sim"
    Then eu devo ver uma mensagem de "sucesso"
    And eu não vejo o recurso "camera logitech" na lista de "recursos da sala"

  Scenario: Remover recurso da lista de recursos de uma sala que não existe
    Given que eu estou logado como "Gisely" como "administrador"
    And que eu estou na página de "detalhes" da sala "E438"
    Then eu devo ver uma mensagem de "erro"
    And eu vejo que a pagina "detalhes" não existe

  Scenario: Remover recurso sem estar na conta administrador
    Given que eu estou logado como "jrvn" como "aluno"
    And que eu estou na página de "detalhes" da sala "E428"
    When eu vejo a lista de "recursos da sala"
    Then eu vejo a opção "remover" "desabilitada" ao lado do recurso "camera logitech"
    And o recurso não deve ser removido da lista de "recursos da sala"
