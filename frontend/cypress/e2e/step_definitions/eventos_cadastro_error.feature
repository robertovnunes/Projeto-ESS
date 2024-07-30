Feature: Cadastro de um Evento não-sucedido

Scenario: Cadastro de um evento de forma não-sucedida pelo professor
    Given Eu estou logado como "professor"
    When Eu visito a página "/events"
    And Eu escolho a opcao "Cadastrar Novo Evento"
    And Eu sou redirecionado para a página "/create-event"
    When Eu preencho o campo "Nome do Evento" com "Workshop IoT"
    And Eu preencho o campo "Professor Responsável" com "Mariana Almeida"
    And Eu preencho o campo "Horário" com "08/04/2024 03:00 PM"
    And Eu escolho a opcao "Cadastrar Evento"
    Then A mensagem "Event already exists" deve ser exibida

