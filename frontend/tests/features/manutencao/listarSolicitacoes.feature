Feature: confirmar solicitações de manutenção
  As a administrador
  I want to listar solicitações de manutenção
  So that I can confirmar solicitações de manutenção

  Scenario: listar solicitações de manutenção
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    Then eu devo ver uma lista de solicitações de "manutenção"

  Scenario: buscar solicitações de manutenção por patrimonio
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu preencho o campo de busca com "1123456"
    Then eu devo ver apenas "Projetor epson" na lista de solicitações de "manutenção"

  Scenario: listar solicitações de manutenção por status
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu filtro por "status"
    Then eu devo ver uma lista de solicitações de "manutenção" ordenadas por "status"

  Scenario: listar solicitações de manutenção por data
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu filtro por "data"
    Then eu devo ver uma lista de solicitações de "manutenção" ordenadas por "data"

  Scenario: listar solicitações de manutenção por prioridade
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu filtro por "prioridade"
    Then eu devo ver uma lista de solicitações de "manutenção" ordenadas por "prioridade"

  Scenario: listar solicitações de manutenção vazia
    Given que não existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    Then eu devo ver uma mensagem de "nenhuma solicitação de manutenção"

  Scenario: listar solicitações com status pendente
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu filtro por "status pendente"
    Then eu devo ver uma lista de solicitações de "manutenção" com "status pendente"

  Scenario: listar solicitações com status confirmado
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu filtro por "status confirmado"
    Then eu devo ver uma lista de solicitações de "manutenção" com "status confirmado"

  Scenario: listar solicitações com status negado
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu filtro por "status negado"
    Then eu devo ver uma lista de solicitações de "manutenção" com "status negado"

  Scenario: listar solicitações com status pendente vazia
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu filtro por "status pendente"
    Then eu devo ver uma mensagem de "nenhuma solicitação de manutenção"

  Scenario: listar solicitações com status confirmado vazia
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu filtro por "status confirmado"
    Then eu devo ver uma mensagem de "nenhuma solicitação de manutenção"

  Scenario: listar solicitações com status negado vazia
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu filtro por "status negado"
    Then eu devo ver uma mensagem de "nenhuma solicitação de manutenção"

  Scenario: buscar solicitações de manutenção por equipamento
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu preencho o campo de busca com "projetor"
    Then eu devo ver uma lista de solicitações de "manutenção" que contém "projetor"

  Scenario: buscar solicitações de manutenção por usuário
    Given que existem solicitações de "manutenção"
    When eu acesso a página de "solicitações de manutenção"
    And eu preencho o campo de busca com "joão"
    Then eu devo ver uma lista de solicitações de "manutenção" que contém "joão"