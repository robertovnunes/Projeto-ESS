Feature: Cadastro de um Evento bem-sucedido

Scenario: Cadastro de um evento de forma sucecida pelo professor
    Given Eu estou logado como "professor"
    When Eu visito a página "/events"
    And Eu escolho a opcao "Cadastrar Novo Evento"
    And Eu sou redirecionado para a página "/create-event"
    When Eu preencho o campo "Nome do Evento" com "Workshop Machine Learning"
    And Eu preencho o campo "Descrição" com "Um workshop sobre Machine Learning"
    And Eu preencho o campo "Professor Responsável" com "Marcelo Vidal"
    And Eu preencho o campo "Horário" com "05/08/2024 04:00 PM"
    And Eu escolho a opcao "Cadastrar Evento"
    Then A mensagem "Event already exists" deve ser exibida

