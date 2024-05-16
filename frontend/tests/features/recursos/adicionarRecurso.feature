Feature: Adicionar recurso a uma sala
  Como um usuário administrador
  Eu quero adicionar um recurso a uma sala
  Para que eu possa gerenciar os recursos disponíveis

  Scenario: Adicionar recurso a uma sala
    Given que estou na pagina de "detalhes" na sala "E428"
    And eu não vejo "Projetor" na lista de recursos da sala
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Recurso adicionado com sucesso"
    And eu vejo o recurso "Projetor" na lista de recursos da sala

  Scenario: Adicionar recurso a uma sala com nome em branco
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com ""
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Nome do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com patrimonio em branco
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com ""
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Patrimonio do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com descricao em branco
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com ""
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Descrição do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com estado de conservacao em branco
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com ""
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Estado de conservação do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com data de aquisicao em branco
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com ""
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Data de aquisição do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com valor estimado em branco
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com ""
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Valor estimado do recurso não pode ser vazio"

  Scenario: Adicionando recurso com estado de conservação não funcional
    Given que estou na pagina de "detalhes de uma sala"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "não funcional"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Estado de conservação do recurso inválido"

  Scenario: Adicionar recurso duplicado a uma sala
    Given que estou na pagina de "detalhes de uma sala"
    And eu vejo "Projetor" na lista de recursos da sala
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Recurso já existe, edite ou remova o recurso existente"
    And eu vejo o recurso "Projetor" na lista de recursos da sala apenas uma vez