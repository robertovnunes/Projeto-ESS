Feature: Cadastro de um Evento bem-sucedido

Scenario: Cadastro de um evento de forma sucecida pelo professor
    Given Eu estou logado como "professor"
    When Eu visito a página "/events"
    And Eu escolho a opcao "Cadastrar Novo Evento"
    And Eu sou redirecionado para a página "/create-event"
    When Eu preencho o campo "Nome do Evento" com "Palestra de Matemática"
    And Eu preencho o campo "Professor Responsável" com "Edgar Viera"
    And Eu preencho o campo "Horário" com "20/06/2024 09:00 AM"
    And Eu escolho a opcao "Cadastrar Evento"
    Then A mensagem "Event already exists" deve ser exibida

