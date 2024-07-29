Feature: Cadastro de uma Disciplina mal-sucedida

Scenario: Cadastro de uma disciplina de forma mal-sucedido pelo professor
    Given Eu estou logado como "professor"
    When Eu visito a página "/disciplines"
    And Eu escolho a opcao "Cadastrar Nova Disciplina"
    And Eu sou redirecionado para a página "/create-discipline"
    When Eu preencho o campo "Nome da Disciplina" com "Algoritmos e Estruturas de Dados"
    And Eu preencho o campo "ID da Disciplina" com "AE301"
    And Eu preencho o campo "Professor Responsável" com "Fernando Lima Carvalho"
    And Eu preencho a data de início com "18/05/2024"
    And Eu preencho a data de término com "25/05/2024"
    And Eu preencho a hora com "02:00 PM"
    And Eu seleciono os dias da semana "SEG" e "QUA" e "SEX"
    And Eu escolho a opcao "Cadastrar Disciplina"
    Then A mensagem "Discipline already exists" deve ser exibida

Scenario: Cadastro de uma disciplina de forma mal-sucedido pelo Administrador
    Given Eu estou logado como "admin"
    When Eu visito a página "/disciplines"
    And Eu escolho a opcao "Cadastrar Nova Disciplina"
    And Eu sou redirecionado para a página "/create-discipline"
    When Eu preencho o campo "Nome da Disciplina" com "Matemática Discreta"
    And Eu preencho o campo "ID da Disciplina" com "MD101"
    And Eu preencho o campo "Professor Responsável" com "Patrícia Alves Dias"
    And Eu preencho a data de início com "15/05/2024"
    And Eu preencho a data de término com "30/05/2024"
    And Eu preencho a hora com "09:30 AM"
     And Eu seleciono os dias da semana "TER" e "QUI"
    And Eu escolho a opcao "Cadastrar Disciplina"
    Then A mensagem "Discipline already exists" deve ser exibida