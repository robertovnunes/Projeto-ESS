Feature: Remover equipamentos de uma sala
  As a administrador
  I want to remover um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario Outline: Remover um equipamento com sucesso
    Given que eu tenho o equipamento com id <id>
    When eu recebo uma requisição "/DELETE/:id" do usuario "joao" logado como "admin"
    Then o equipamento com id <id> deve ser removido do banco de dados
    And eu envio uma resposta de "sucesso" com codigo "200"

    Examples:
        |id       |
        | 123456  |
        | 7891234 |

#  Scenario: Remover um equipamento inexistente
#    Given que eu nao tenho o equipamento com id "5237418"
#    When eu recebo uma requisição "/DELETE/5237418" do usuario "joao" logado como "admin"
#    Then eu envio uma resposta de erro com codigo "400" e mensagem de "Equipamento nao encontrado" para o id "5237418"

