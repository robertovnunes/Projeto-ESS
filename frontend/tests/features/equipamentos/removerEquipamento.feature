Feature: remover equipamento da lista
  As a administrador
  I want to remover um equipamento da lista
  So that ele não seja mais exibido

    Scenario: remover equipamento da lista
        Given que estou na página de equipamentos
        When eu escolho "remover" para o equipamento "notebook"
        Then eu devo ver a mensagem "Deseja remover equipamento?"
        When eu confirmo a remoção
        Then o equipamento é removido da lista
        And eu não devo ver "notebook" na lista de equipamentos

    Scenario: cancelar remoção de equipamento
        Given que estou na página de equipamentos
        When eu escolho "remover" para o equipamento "notebook"
        Then eu devo ver a mensagem "Deseja remover equipamento?"
        When eu cancelo a remoção
        Then o equipamento não é removido da lista
        And eu devo ver "notebook" na lista de equipamentos