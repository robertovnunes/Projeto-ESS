Feature: Editar uma disciplina com sucesso

Scenario: Editar uma disciplina com sucesso pelo professor
    Given Eu estou logado como "professor"
    When Eu visito a página "/disciplines"
    And Eu escolho a opcao "Editar Disciplina Existente"
    And Eu sou redirecionado para a página "/disciplines-list"
    And Eu escolho a opção "Editar" da disciplina "Introdução a Programação"
    When Eu preencho o campo "Nome da Disciplina" com "Introdução a Programação Avançada"
    And Eu preencho o campo "ID da Disciplina" com "IF120"
    And Eu preencho o campo "Professor Responsável" com "Sergio Soares"
    And Eu preencho a data de início com "24/07/2024"
    And Eu preencho a data de término com "27/09/2024"
    And Eu preencho a hora com "10:00 AM"
    And Eu seleciono os dias da semana "QUA" e "QUI"
    And Eu escolho a opcao "Salvar"
    Then A mensagem "Disciplina atualizada com sucesso" deve ser exibida

Scenario: Editar uma disciplina com sucesso pelo administrador
    Given Eu estou logado como "admin"
    When Eu visito a página "/disciplines"
    And Eu escolho a opcao "Editar Disciplina Existente"
    And Eu sou redirecionado para a página "/disciplines-list"
    And Eu escolho a opção "Editar" da disciplina "Matemática Discreta"
    When Eu preencho o campo "Nome da Disciplina" com "Matemática Discreta Avançada"
    And Eu preencho o campo "ID da Disciplina" com "MD103"
    And Eu preencho o campo "Professor Responsável" com "Joaquim Bezerra"
    And Eu preencho a data de início com "23/07/2024"
    And Eu preencho a data de término com "28/09/2024"
    And Eu preencho a hora com "11:00 AM"
    And Eu seleciono os dias da semana "QUA" e "SEX"
    And Eu escolho a opcao "Salvar"
    Then A mensagem "Disciplina atualizada com sucesso" deve ser exibida
