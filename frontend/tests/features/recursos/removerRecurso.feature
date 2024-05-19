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

  Scenario: cancelar remoção de recurso da sala
    Given que eu estou na página de "detalhes" da sala "E428"
    When eu escolho "Remover" ao lado do recurso "camera logitech"
    Then eu devo ver uma mensagem de "confirmação"
    When eu escolho "não"
    Then eu retorno para a pagina de "detalhes" da sala "E428"
    And eu vejo o recurso "camera logitech" na lista de "recursos da sala"

  Scenario: Remover recurso da lista de recursos de uma sala que não existe
    Given que eu estou logado como "Gisely" como "administrador"
    And que eu estou na página de "detalhes" da sala "E438"
    Then eu devo ver uma mensagem de "erro"
    And eu vejo que a pagina "detalhes" não existe

  Scenario: Remover recurso essencial da lista de recursos de uma sala
    Given que eu estou na página de "detalhes" da sala "E428"
    When eu escolho "Remover" ao lado do recurso "Projetor epson"
    Then eu devo ver uma mensagem de "Erro, a sala precisa ter pelo menos um projetor"
    And o recurso não deve ser removido da lista de "recursos da sala"

  Scenario: Remover cadeiras da lista de recursos de uma sala com quantidade menor que capacidade
    Given que eu estou na página de "detalhes" da sala "E428"
    And eu vejo que a sala tem capacidade de "40"
    And eu vejo que a sala tem "40" cadeiras
    When eu escolho "Remover" ao lado do recurso "cadeira"
    And eu escolho a quantidade de "10"
    Then eu devo ver uma mensagem de "Erro, a quantidade de cadeiras não pode ser menor que a capacidade da sala"
    And o recurso não deve ser removido da lista de "recursos da sala"
