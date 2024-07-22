Feature: Adicionar recurso a uma sala
  Como um usuário administrador
  Eu quero adicionar um recurso a uma sala
  Para que eu possa gerenciar os recursos disponíveis

  Scenario: Adicionar recurso a uma sala
    Given que estou na pagina de "detalhes" da sala "E428"
    And eu não vejo "Projetor" na lista de "recursos da sala"
    When eu escolho "Adicionar recurso"
    Then eu devo ser redirecionado para a página de "Adicionar equipamento"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com "1"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Recurso adicionado com sucesso"
    And eu vejo o recurso "Projetor" na lista de "recursos da sala"

  Scenario: Adicionar recurso a uma sala com nome em branco
    Given que estou na pagina de "detalhes" da sala "E428"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com ""
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com "1"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Nome do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com patrimonio em branco
    Given que estou na pagina de "detalhes" da sala "E428"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com ""
    And eu preencho o campo "quantidade" com "1"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Patrimonio do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com descricao em branco
    Given que estou na pagina de "detalhes" da sala "E428"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com ""
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com "1"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Descrição do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com estado de conservacao em branco
    Given que estou na pagina de "detalhes" da sala "E428"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com ""
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com "1"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Estado de conservação do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com data de aquisicao em branco
    Given que estou na pagina de "detalhes" da sala "E428"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com ""
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com "1"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Data de aquisição do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com valor estimado em branco
    Given que estou na pagina de "detalhes" da sala "E428"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com ""
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com "1"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Valor estimado do recurso não pode ser vazio"

  Scenario: Adicionando recurso com estado de conservação não funcional
    Given que estou na pagina de "detalhes" da sala "E428"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "não funcional"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com "1"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Estado de conservação do recurso inválido"

  Scenario: Adicionar recurso duplicado a uma sala
    Given que estou na pagina de "detalhes" da sala "E428"
    And eu vejo "Projetor" na lista de recursos da sala
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com "1"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Recurso já existe, edite ou remova o recurso existente"
    And eu vejo o recurso "Projetor" na lista de "recursos da sala" apenas uma vez

  Scenario: Adicionar recurso a uma sala com quantidade em branco
    Given que estou na pagina de "detalhes" da sala "E428"
    When eu escolho "Adicionar recurso"
    And eu preencho o campo "Nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com ""
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "Quantidade do recurso não pode ser vazio"

  Scenario: Adicionar recurso a uma sala com quantidade insuficiente
    Given que estou na pagina de "detalhes" da sala "E428"
    And eu não vejo "Cadeiras" na lista de recursos da sala
    And eu vejo "capacidade" com "40" na pagina de "detalhes" da sala "E428"
    When eu escolho "Adicionar recurso"
    And eu estou na pagina de "adicionar recurso"
    When eu preencho o campo "Nome" com "Cadeiras"
    And eu preencho o campo "descricao" com "Cadeiras com braço estudante"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "R$ 150.00"
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu preencho o campo "quantidade" com "35"
    And eu escolho "Adicionar"
    Then eu vejo a mensagem "A quantidade de cadeiras precisa ser maior ou igual a capacidade da sala"
    And eu retorno para a pagina de "Adicionar recurso" da sala "E428"
    And todos os campos permanecem preenchidos