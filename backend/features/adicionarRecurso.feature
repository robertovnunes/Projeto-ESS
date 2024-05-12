Feature: Adicionar recurso a uma sala
  Como um usuário administrador
  Eu quero adicionar um recurso a uma sala
  Para que eu possa gerenciar os recursos disponíveis

  Scenario: Adicionar recurso a uma sala
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu clico no botao "Adicionar"
    Then eu vejo a mensagem "Recurso adicionado com sucesso"
    And eu vejo o recurso "Projetor" na lista de recursos da sala