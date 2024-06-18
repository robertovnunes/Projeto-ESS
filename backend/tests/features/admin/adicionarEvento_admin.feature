Feature: Cadastro de um Evento
As a Administrador
I want to Cadastrar um Evento
So that Eu possa usar esse Evento para reservar uma sala
    
    Scenario: Cadastro de um Evento com sucesso pelo Usuário Administrador 
    Given O usuário "secgrad" está logado como "admin"
    And O evento "Monitoria de HFC" com a data "22-06-2024 04:00 PM" não está no sistema
    When O usuário "secgrad" manda uma requisição POST para "/events/signup"
    And preenche no corpo "eventName" : "Monitoria de HFC"
    And preenche no corpo "description" : "Monitoria da disciplina História e Futuro da Computação"
    And preenche no corpo "responsibleTeacher" : "Germano Crispim"
    And preenche no corpo "eventDateAndTime" : "22-06-2024 04:00 PM"
    Then O sistema retorna "201 Created"
    And A mensagem "Evento cadastrado com sucesso" é exibida
    And O evento "Monitoria de HFC" na data "22-06-2024 04:00 PM" está no banco de dados

    Scenario: Cadastro de um evento sem sucesso pelo Usuário Administrador (já está cadastrado no sistema)
    Given O usuário "secgrad" está logado como "admin"
    And O evento "Monitoria de HFC" com a data "22-06-2024 04:00 PM" já está presente no sistema
    When O usuário "secgrad" manda uma requisição POST para "/events/signup"
    And preenche no corpo "eventName" : "Monitoria de HFC"
    And preenche no corpo "description" : "Monitoria da disciplina História e Futuro da Computação"
    And preenche no corpo "responsibleTeacher" : "Germano Crispim"
    And preenche no corpo "eventDateAndTime" : "22-06-2024 04:00 PM"
    Then O sistema retorna "400"
    And A mensagem "Event already exists" é exibida


    Scenario: Cadastro de um evento sem sucesso pelo Usuário Administrador(faltam informações obrigatórias - campo eventDateAndTime) 

    Given O usuário "secgrad" está logado como "admin"
    When O usuário "secgrad" manda uma requisição POST para "/events/signup"
    And preenche no corpo "eventName" : "Monitoria de HFC"
    And preenche no corpo "description" : "Monitoria da disciplina História e Futuro da Computação"
    And preenche no corpo "responsibleTeacher" : "Germano Crispim"
    And preenche no corpo "eventDateAndTime" : ""
    Then O sistema retorna "400 Bad Request"
    And A mensagem "Informações obrigatórias não preenchidas" é exibida

      Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Administrador(input errado - campo horario) 
        Given O usuário "secgrad" está logado como "admin"
        When O usuário "secgrad" manda uma requisição POST para "/events/signup"
        And preenche no corpo "eventName" : "Monitoria de HFC"
        And preenche no corpo "description" : "Monitoria da disciplina História e Futuro da Computação"
        And preenche no corpo "responsibleTeacher" : "Germano Crispim"
        And preenche no corpo "eventDateAndTime" : "segunda-feira 10:00-12:00"
        Then O sistema retorna "400 Bad Request"
        And A mensagem "Formato de data inválido" é exibida



