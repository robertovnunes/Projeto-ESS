Feature: Remover recursos de uma sala
  As a administrador
  I want to remover um recurso ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario: Remover um recurso de uma sala
    Given que eu tenho o recurso "Projetor" na sala "E428"
    And id "123456"
    When eu recebo uma requisição "/DELETE/123456"
    Then o recurso deve ser removido do banco de dados

  Scenario: Remover um recurso com restrições de uma sala
    Given que eu tenho o recurso "Projetor" na sala "E428"
    And id "123456"
    When eu recebo uma requisição "/DELETE/123456"
    Then o recurso não deve ser removido do banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And eu envio uma mensagem de "Erro: Recurso não pode ser removido, não pode ter menos de 1 projetor na sala"

