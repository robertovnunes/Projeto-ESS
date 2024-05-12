Feature: Adicionar recurso a uma sala
  Como um usuário administrador
  Eu quero adicionar um recurso a uma sala
  Para que eu possa gerenciar os recursos disponíveis

  Scenario: Adicionar recurso a uma sala
    Given que estou na pagina de "detalhes de uma sala"
    And eu não vejo "Projetor" na lista de recursos da sala
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Recurso adicionado com sucesso"
    And eu vejo o recurso "Projetor" na lista de recursos da sala

  Scenario: Adicionar recurso a uma sala com nome em branco
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com ""
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Nome do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com patrimonio em branco
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "patrimonio" com ""
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Patrimonio do recurso não pode ser vazio"

  Scenario: Adicionar recurso duplicado a uma sala
    Given que estou na pagina de "detalhes de uma sala"
    And eu vejo "Projetor" na lista de recursos da sala
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Recurso já existe"
    And eu vejo o recurso "Projetor" na lista de recursos da sala apenas uma vez