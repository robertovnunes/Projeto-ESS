Feature: Listar solicitacoes de manutencao no banco de dados
  As a administrador
  I want to ver as solicitacoes de manutencao no banco de dados
  So that eu posso confirmar ou negar as reservas

  Scenario: listando todas as solicitacoes de manutencao
    Given que eu tenho solicitacoes de manutencao no banco de dados
    When eu recebo uma solicitação "/GET"
    Then eu envio todas as solicitacoes de manutencao de equipamento

  Scenario: listando todas as solicitacoes de manutencao de equipamento ou recurso
    Given que eu tenho solicitacoes de manutencao no banco de dados
    When eu recebo uma solicitação "/GET/123456"
    Then eu envio todas as solicitacoes de manutencao do equipamento com id "123456"

  Scenario: listando nenhuma solicitacao de manutencao de equipamento ou recurso
    Given que eu não tenho solicitacoes de manutencao no banco de dados
    When eu recebo uma solicitação "/GET"
    Then envio uma mensagem de erro "Nenhuma solicitacao de manutencao encontrada"