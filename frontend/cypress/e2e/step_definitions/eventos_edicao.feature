Feature: Editar um Evento bem-sucedido

Scenario: Edição de um evento de forma sucecida pelo professor
    Given Eu estou logado como "professor"
    When Eu visito a página "/events"
    And Eu escolho a opcao "Editar Evento Existente"
    And Eu sou redirecionado para a página "/events-list"
    And Eu escolho a opção "Editar" do evento "Workshop Drones"
    When Eu preencho o campo "Nome do Evento" com "Workshop 2D"
    And Eu preencho o campo "Professor Responsável" com "Gabriel Lopes"
    And Eu preencho o campo "Horário" com "21/06/2024 09:00 AM"
    And Eu escolho a opcao "Salvar"
    Then A mensagem "Evento atualizado com sucesso" deve ser exibida