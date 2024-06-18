Feature: Remover equipamentos de uma sala
  As a administrador
  I want to remover um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario: Remover um equipamento com sucesso
    Given que eu tenho o equipamento "Projetor" com id "123456"
    When eu recebo uma requisição "/DELETE/123456" do usuario "joao" logado como "admin"
    Then o equipamento deve ser removido do banco de dados
    And eu envio uma resposta de "sucesso" com codigo "200"

  Scenario: Remover um equipamento inexistente
    Given que eu nao tenho o equipamento "Projetor" com id "123456"
    When eu recebo uma requisição "/DELETE/123456" do usuario "joao" logado como "admin"
    Then o equipamento não deve ser removido do banco de dados
    And eu envio uma resposta de "erro" com codigo "400"
    And eu envio uma mensagem de "Erro: equipamento existe"

