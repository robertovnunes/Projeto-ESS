Feature: Editar recurso de sala
  As a administrador
  I want to editar um recurso de sala
  So I can alterar suas informações

  Scenario: Editando nome do recurso com sucesso
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    When eu escolho "editar"
    And eu preencho o campo "Nome" com "Projetor epson"
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Recurso editado com sucesso"
    And o "nome" do recurso "Projetor" deve ser "Projetor epson"

  Scenario: Editando descrição do recurso
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And descrição do recurso "Projetor" é "Projetor epson"
    When eu escolho "editar"
    And eu preencho o campo "Descrição" com "Projetor epson 3000 lumens"
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Recurso editado com sucesso"
    And a "descrição" do recurso "Projetor" deve ser "Projetor epson 3000 lumens"

  Scenario: Editando estado de conservacao do recurso com sucesso
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And estado de conservacao do recurso "Projetor" é "Novo"
    When eu escolho "editar"
    And eu preencho o campo "Estado de conservação" com "Reformado"
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Recurso editado com sucesso"
    And o "estado de conservação" do recurso "Projetor" deve ser "Reformado"

  Scenario: Editando data de aquisicao do recurso
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And "data de aquisicao" do recurso "Projetor" é "01/01/2016"
    When eu escolho "editar"
    And eu preencho o campo "data de aquisicao" com "01/01/2015"
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Recurso editado com sucesso"
    And a "data de aquisição" do recurso "Projetor" deve ser "01/01/2015"

  Scenario: Editando valor estimado do recurso
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And "valor estimado" do recurso "Projetor" é "R$ 1.000,00"
    When eu escolho "editar"
    And eu preencho o campo "valor estimado" com "R$ 1.500,00"
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Recurso editado com sucesso"
    And o "valor estimado" do recurso "Projetor" deve ser "R$ 1.500,00"

  Scenario: Editando patrimonio do recurso
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And "patrimonio" do recurso "Projetor" é "123456"
    When eu escolho "editar"
    And eu preencho o campo "patrimonio" com "654321"
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Recurso editado com sucesso"
    And o "patrimonio" do recurso "Projetor" deve ser "654321"

  Scenario: Editando recurso deixando nome vazio
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    When eu escolho "editar"
    And eu preencho o campo "Nome" com ""
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Nome não pode ficar em branco"

  Scenario: Editando recurso deixando descrição vazia
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And descrição do recurso "Projetor" é "Projetor epson"
    When eu escolho "editar"
    And eu preencho o campo "Descrição" com ""
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Descrição não pode ficar em branco"

  Scenario: Editando recurso deixando estado de conservacao vazio
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And estado de conservacao do recurso "Projetor" é "Novo"
    When eu escolho "editar"
    And eu preencho o campo "Estado de conservação" com ""
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Estado de conservação não pode ficar em branco"

  Scenario: Editando recurso deixando data de aquisicao vazia
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And "data de aquisicao" do recurso "Projetor" é "01/01/2016"
    When eu escolho "editar"
    And eu preencho o campo "data de aquisicao" com ""
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Data de aquisição não pode ficar em branco"

  Scenario: Editando recurso deixando valor estimado vazio
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And "valor estimado" do recurso "Projetor" é "R$ 1.000,00"
    When eu escolho "editar"
    And eu preencho o campo "valor estimado" com ""
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Valor estimado não pode ficar em branco"
    And eu retorno a pagina "editar" do recurso "Projetor"

  Scenario: Editando recurso deixando patrimonio vazio
    Given que eu estou na pagina de "detalhes" da sala "D004"
    And eu vejo o recurso "Projetor" na lista de "recursos"
    And "patrimonio" do recurso "Projetor" é "123456"
    When eu escolho "editar"
    And eu preencho o campo "patrimonio" com ""
    And eu escolho "Salvar"
    Then eu devo ver a mensagem "Patrimônio não pode ficar em branco"