Feature: Buscar equipamentos
  As a usuário administrador
  I want procurar na lista de equipamentos
  So that eu possa ver, remover ou editar os equipamentos disponíveis nas salas

  Scenario: Listar todos os equipamentos
    Given que exitem equipamentos cadastrados no sistema
    When eu recebo uma requisição "/GET" do usuario "joao" logado como "admin"
    Then eu retorno uma lista de equipamentos disponíveis

  Scenario: buscar equipamento específico por id
    Given que exite o equipamento com "id" "123456" e "patrimonio" "1098765" cadastrado
    When eu recebo uma requisição "/GET/123456" do usuario "joao" logado como "admin"
    Then eu envio uma resposta de "sucesso" com codigo "200"
    And json com os dados do equipamento "Projetor epson"

  Scenario: buscar equipamento específico por patrimonio
    Given que exite o equipamento com "id" "123456" e "numero_serie" "1098765" cadastrado
    When eu recebo uma requisição "/GET/123456" do usuario "joao" logado como "admin"
    Then eu envio uma resposta de "sucesso" com codigo "200"
    And json com os dados do equipamento "Projetor epson"

  Scenario: buscar equipamento específico por numero de serie
    Given que exite o equipamento com "id" "123456" e "numero_serie" "1098765" cadastrado
    When eu recebo uma requisição "/GET/123456" do usuario "joao" logado como "admin"
    Then eu envio uma resposta de "sucesso" com codigo "200"
    And json com os dados do equipamento "Projetor epson"

  Scenario: Buscar equipamento inexistente
    Given que não existe o equipamento com id "654321"
    When eu recebo uma requisição "/GET/654321" do usuario "joao" logado como "admin"
    Then eu envio uma resposta de "erro" com codigo "404"
    And json com a mensagem "equipamento não encontrado"


