Feature: Remover equipamentos de uma sala
  As a administrador
  I want to remover um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario: Remover um equipamento com sucesso
    Given que eu tenho o equipamento com id "7891234" e json:
    """
    {
      "id": "7891234",
      "nome": "Monitor LG",
      "descricao": "Monitor LG 21 polegadas",
      "estado_conservacao": "Novo",
      "data_aquisicao": "10/02/2022",
      "valor_estimado": "R$ 800.00",
      "patrimonio": "1098643",
      "reservas": [],
      "manutencao": []
    }
    """
    When eu recebo uma requisição "/DELETE" para o id "7891234" do usuario "joao" logado como "admin"
    Then o equipamento com id "7891234" deve ser removido do banco de dados

  Scenario: Remover um equipamento inexistente
    Given que eu nao tenho o equipamento com id "5237418"
    When eu recebo uma requisição "/DELETE" para o id "5237418" do usuario "joao" logado como "admin"
    Then eu envio uma resposta de erro com codigo "400" e mensagem de "Equipamento nao encontrado" para o id "5237418"

