Feature: Deletar um Evento bem-sucedido

Scenario: Deletar um evento de forma sucecida pelo professor
    Given Eu estou logado como "professor"
    When Eu visito a página "/events"
    And Eu escolho a opcao "Editar Evento Existente"
    And Eu sou redirecionado para a página "/events-list"
    And Eu escolho a opção "Deletar" do evento "Workshop Drones"
    Then O evento "Workshop Drones" não deve mais existir