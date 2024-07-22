Feature: Editar equipamentos no sistema
  As a administrador
  I want to editar equipamentos no sistema
  So that eu possa atualizar as informações de um equipamento

  Scenario: Editar equipamento com sucesso
    Given que estou na página de "edição de equipamentos"
    When eu preencher o campo "Nome" com "Placa intel galileo"
    And eu preencher o campo "Descrição" com "Intel Galileo Gen 2"
    And eu preencher o campo "estado" com "Novo"
    And eu preencher o campo "Data de aquisição" com "01/01/2020"
    And eu preencher o campo "Valor de aquisição" com "1000.00"
    And eu preencher o campo "quantidade" com "5"
    And eu clicar no botão "Salvar"
    Then eu devo ver a mensagem "Equipamento atualizado com sucesso"
    And eu devo ver a página de "detalhes do equipamento"

  Scenario: Editar equipamento com nome em branco
    Given que estou na página de "edição de equipamentos"
    When eu preencher o campo "Nome" com ""
    And eu preencher o campo "Descrição" com "Intel Galileo Gen 2"
    And eu preencher o campo "estado" com "Novo"
    And eu preencher o campo "Data de aquisição" com "01/01/2020"
    And eu preencher o campo "Valor de aquisição" com "1000.00"
    And eu preencher o campo "quantidade" com "5"
    And eu clicar no botão "Salvar"
    Then eu devo ver a mensagem "Erro ao atualizar equipamento: Nome nao pode estar em branco"
    And eu devo ver a página de "edição de equipamentos"

  Scenario: Editar equipamento com campos obrigatórios em branco
    Given que estou na página de "edição de equipamentos"
    When eu preencher o campo "Nome" com ""
    And eu preencher o campo "Descrição" com ""
    And eu preencher o campo "estado" com ""
    And eu preencher o campo "Data de aquisição" com ""
    And eu preencher o campo "Valor de aquisição" com ""
    And eu preencher o campo "quantidade" com ""
    And eu clicar no botão "Salvar"
    Then eu devo ver a mensagem "Erro ao atualizar equipamento"
    And eu devo ver a página de "edição de equipamentos"

  Scenario: Editar equipamento com campos inválidos
    Given que estou na página de "edição de equipamentos"
    When eu preencher o campo "Nome" com "Placa intel galileo"
    And eu preencher o campo "Descrição" com "Intel Galileo Gen 2"
    And eu preencher o campo "estado" com "Novo"
    And eu preencher o campo "Data de aquisição" com "01/01/2020"
    And eu preencher o campo "Valor de aquisição" com "1000.00"
    And eu preencher o campo "quantidade" com "cinco"
    And eu clicar no botão "Salvar"
    Then eu devo ver a mensagem "Erro ao atualizar equipamento"
    And eu devo ver a página de "edição de equipamentos"

  Scenario: Editar equipamento com descricao em branco
    Given que estou na página de "edição de equipamentos"
    When eu preencher o campo "Nome" com "Placa intel galileo"
    And eu preencher o campo "Descrição" com ""
    And eu preencher o campo "estado" com "Novo"
    And eu preencher o campo "Data de aquisição" com "01/01/2020"
    And eu preencher o campo "Valor de aquisição" com "1000.00"
    And eu preencher o campo "quantidade" com "5"
    And eu clicar no botão "Salvar"
    Then eu devo ver a mensagem "Erro ao atualizar equipamento: Descrição nao pode estar em branco"
    And eu devo ver a página de "detalhes do equipamento"

  Scenario: Editar equipamento com estado em branco
    Given que estou na página de "edição de equipamentos"
    When eu preencher o campo "Nome" com "Placa intel galileo"
    And eu preencher o campo "Descrição" com "Intel Galileo Gen 2"
    And eu preencher o campo "estado" com ""
    And eu preencher o campo "Data de aquisição" com "01/01/2020"
    And eu preencher o campo "Valor de aquisição" com "1000.00"
    And eu preencher o campo "quantidade" com "5"
    And eu clicar no botão "Salvar"
    Then eu devo ver a mensagem "Erro ao atualizar equipamento: Estado nao pode estar em branco"
    And eu devo ver a página de "detalhes do equipamento"

  Scenario: Editar equipamento com data de aquição em branco
    Given que estou na página de "edição de equipamentos"
    When eu preencher o campo "Nome" com "Placa intel galileo"
    And eu preencher o campo "Descrição" com "Intel Galileo Gen 2"
    And eu preencher o campo "estado" com "Novo"
    And eu preencher o campo "Data de aquisição" com ""
    And eu preencher o campo "Valor de aquisição" com "1000.00"
    And eu preencher o campo "quantidade" com "5"
    And eu clicar no botão "Salvar"
    Then eu devo ver a mensagem "Erro ao atualizar equipamento: Data de aquisição nao pode estar em branco"
    And eu devo ver a página de "detalhes do equipamento"

  Scenario: Editar equipamento com valor em branco
    Given que estou na página de "edição de equipamentos"
    When eu preencher o campo "Nome" com "Placa intel galileo"
    And eu preencher o campo "Descrição" com "Intel Galileo Gen 2"
    And eu preencher o campo "estado" com "Novo"
    And eu preencher o campo "Data de aquisição" com "01/01/2020"
    And eu preencher o campo "Valor de aquisição" com ""
    And eu preencher o campo "quantidade" com "5"
    And eu clicar no botão "Salvar"
    Then eu devo ver a mensagem "Erro ao atualizar equipamento: Valor estimado nao pode estar em branco"
    And eu devo ver a página de "detalhes do equipamento"

  Scenario: Editar equipamento com quantidade em branco
    Given que estou na página de "edição de equipamentos"
    When eu preencher o campo "Nome" com "Placa intel galileo"
    And eu preencher o campo "Descrição" com "Intel Galileo Gen 2"
    And eu preencher o campo "Modelo" com "Galileo Gen 2"
    And eu preencher o campo "estado" com "Novo"
    And eu preencher o campo "Data de aquisição" com "01/01/2020"
    And eu preencher o campo "Valor de aquisição" com "1000.00"
    And eu preencher o campo "quantidade" com ""
    And eu clicar no botão "Salvar"
    Then eu devo ver a mensagem "Falha ao atualizar equipamento: Quantidade nao pode estar vazio"
    And eu devo ver a página de "detalhes do equipamento"