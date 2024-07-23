Feature: Cadastro de uma Disciplina bem-sucedido

Feature: Cadastro de uma Disciplina bem-sucedido

Scenario: Cadastro de uma disciplina de forma sucecida pelo professor
    Given Eu estou logado como "professor"
    When Eu visito a página "/disciplines"
    And Eu escolho a opcao "Cadastrar Nova Disciplina"
    And Eu sou redirecionado para a página "/create-discipline"
    When Eu preencho o campo "Nome da Disciplina" com "Matemática Avançada"
    And Eu preencho o campo "ID da Disciplina" com "MA120"
    And Eu preencho o campo "Professor Responsável" com "Edgar Viera"
    And Eu preencho a data de início com "24/06/2024"
    And Eu preencho a data de término com "27/08/2024"
    And Eu preencho a hora com "09:00 AM"
    And Eu seleciono os dias da semana "SEG" e "QUI"
    And Eu escolho a opcao "Cadastrar Disciplina"
    Then A mensagem "Disciplina cadastrada com sucesso" deve ser exibida


Scenario: Cadastro de uma disciplina de forma sucecida pelo Administrador
    Given Eu estou logado como "admin"
    When Eu visito a página "/disciplines"
    And Eu escolho a opcao "Cadastrar Nova Disciplina"
    And Eu sou redirecionado para a página "/create-discipline"
    When Eu preencho o campo "Nome da Disciplina" com "Xadrez Avançado"
    And Eu preencho o campo "ID da Disciplina" com "XA120"
    And Eu preencho o campo "Professor Responsável" com "Gabriel Nogueira"
    And Eu preencho a data de início com "12/05/2025"
    And Eu preencho a data de término com "12/06/2025"
    And Eu preencho a hora com "08:00 AM"
    And Eu seleciono os dias da semana "SEG" e "QUA"
    And Eu escolho a opcao "Cadastrar Disciplina"
    Then A mensagem "Disciplina cadastrada com sucesso" deve ser exibida
