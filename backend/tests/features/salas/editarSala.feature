Feature: As a usuario
  I want to editar um equipamento no banco de dados
  So that eu posso modificar todos os recusros de uma sala

  Scenario: Editar capacidade da sala
    Given existe a sala: 
    """
    {
      "id": "a1b2c3d4",
      "nome": "E426",
      "bloco": "E",
      "capacidade": "40",
      "recursos": [],
      "reservas": []
    }
    """
    When eu recebo uma requisição "/PATCH" e id "a1b2c3d4" do usuario "joao" logado como "admin" e json
    """
    {
      "nome": "E426",
      "bloco": "E",
      "capacidade": "45",
      "recursos": [{cadeiras:45}],
      "reservas": []
    }
    """
    Then o equipamento "Ar condicionado midea" com "patrimonio" "20201567" é modificado no banco de dados para
    """
    {
      "id": "a1b2c3d4",
      "nome": "E426",
      "bloco": "E",
      "capacidade": "45",
      "recursos": [{cadeiras:45}],
      "reservas": []
    }
    """
    And eu envio uma resposta de "sucesso" com codigo "200"
