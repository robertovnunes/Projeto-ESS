Feature: Adicionar equipamentos ao sistema
  As a administrador
  I want to adicionar equipamentos ao sistema
  So that eu possa gerenciar os equipamentos

  Scenario: Adicionar equipamento usando patrimonio
    Given que eu estou na página de "Gerenciar equipamentos"
    When eu escolho "Adicionar equipamento"
    Then eu devo ser redirecionado para a página de "Adicionar equipamento"
    When eu preencho o campo "nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu escolho "Patrimonio" como identificador
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Salvar"
    Then eu vejo a mensagem "Equipamento adicionado com sucesso"

  Scenario: Adicionar equipamento usando numero de série
    Given que eu estou na página de "Gerenciar equipamentos"
    When eu escolho "Adicionar equipamento"
    Then eu devo ser redirecionado para a página de "Adicionar equipamento"
    When eu preencho o campo "nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu escolho "Numero de série" como identificador
    And eu preencho o campo "numero_serie" com "364215672012"
    And eu escolho "Salvar"
    Then eu vejo a mensagem "Equipamento adicionado com sucesso"

  Scenario: Adicionar equipamento com campos em branco
    Given que eu estou na página de "Gerenciar equipamentos"
    When eu escolho "Adicionar equipamento"
    Then eu devo ser redirecionado para a página de "Adicionar equipamento"
    When eu preencho o campo "nome" com ""
    And eu preencho o campo "descricao" com ""
    And eu preencho o campo "estado_conservacao" com ""
    And eu preencho o campo "data_aquisicao" com ""
    And eu preencho o campo "valor_estimado" com ""
    And eu escolho "Patrimonio" como identificador
    And eu preencho o campo "patrimonio" com ""
    And eu escolho "Salvar"
    Then eu vejo a mensagem "Campos vazios: Nome, Descrição, Estado de conservação, Data de aquisição, Valor estimado, Patrimônio"

  Scenario: Adicionar equipamento com patrimônio já cadastrado
    Given que eu estou na página de "Gerenciar equipamentos"
    And eu tenho um equipamento com o "patrimônio" "364215672012"
    When eu escolho "Adicionar"
    Then eu devo ser redirecionado para a página de "Adicionar equipamento"
    When eu preencho o campo "nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu escolho "Patrimonio" como identificador
    And eu preencho o campo "patrimonio" com "364215672012"
    And eu escolho "Salvar"
    Then eu vejo a mensagem "Erro ao criar equipamento: patrimônio já cadastrado"

  Scenario: Adicionar equipamento com numero de série já cadastrado
    Given que eu estou na página de "Gerenciar equipamentos"
    And eu tenho um equipamento com o "numero de série" "364215672012"
    When eu escolho "Adicionar"
    Then eu devo ser redirecionado para a página de "Adicionar equipamento"
    When eu preencho o campo "nome" com "Projetor"
    And eu preencho o campo "descricao" com "Projetor Epson"
    And eu preencho o campo "estado_conservacao" com "novo"
    And eu preencho o campo "data_aquisicao" com "20/04/2024"
    And eu preencho o campo "valor_estimado" com "2500.00"
    And eu escolho "Numero de série" como identificador
    And eu preencho o campo "numero_serie" com "364215672012"
    And eu escolho "Salvar"
    Then eu vejo a mensagem "Erro ao criar equipamento: numero de série já cadastrado"
