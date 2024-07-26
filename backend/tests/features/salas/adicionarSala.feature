Feature: As a usuario administrador
  I want to adicionar um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala

  Scenario: Adicionando sala
    Given nao existe a sala "E555"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
     "numero": "555",
     "bloco": "E",
     "capacidade": "45"
    }
    """
    Then a sala "E555" está no banco de dados
    And eu envio uma resposta de sucesso com codigo "201"

  Scenario: Adicionando sala sem numero
    Given nao existe a sala "E426"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
     "numero": "",
     "bloco": "E",
     "capacidade": "45"
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Numero da sala nao informado"

  Scenario: Adicionando sala sem bloco
    Given nao existe a sala "E426"
    When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
    """
    {
     "numero": "426",
     "bloco": "",
     "capacidade": "45"
    }
    """
    Then eu envio uma resposta de erro com codigo "400" e mensagem "Bloco da sala nao informado"

    Scenario: Adicionando sala sem capacidade
      Given nao existe a sala "E426"
      When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
      """
      {
       "numero": "426",
       "bloco": "E",
       "capacidade": ""
      }
      """
      Then eu envio uma resposta de erro com codigo "400" e mensagem "A capacidade da sala nao informada"

    Scenario: Adicionando sala com numero e bloco já existentes
        Given existe a sala "E426"
        """
        {
         "nome": "E426",
         "numero": "426",
         "bloco": "E",
         "capacidade": "40",
         "recursos": ["projetor", "computador", "sistema de som"],
         "reservas": []
        }
        """
        When eu recebo uma requisicao "/POST" do usuario "joao" logado como "admin" e json:
        """
        {
         "numero": "426",
         "bloco": "E",
         "capacidade": "45"
        }
        """
        Then eu envio uma resposta de erro com codigo "400" e mensagem "Sala já cadastrada"