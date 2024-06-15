Feature: As a usuario administrador
  I want to adicionar um equipamento ao banco de dados
  So that eu posso armazenar todos os recusros de uma sala
    
    Scenario: Cadastro de um Evento com sucesso pelo Usuário Professor com descrição vazia
    Given O usuário "bafm" está logado como "professor"
    And O evento "Reunião Geral - RobôCIn" na data "20-05-2024 05:00 PM" não está no sistema
    When O usuário "bafm" manda uma requisição POST para "/events/signup"
    And preenche no corpo "eventName" : "Reunião Geral - RobôCIn"
    And preenche no corpo "description" : ""
    And preenche no corpo "responsibleTeacher" : "Edna Barros"
    And preenche no corpo "eventDateAndTime" : "20-05-2024 05:00 PM"
    Then O sistema retorna "201"
    And A mensagem "Evento cadastrado com sucesso" é exibida
    And O evento "Reunião Geral - RobôCIn" na data "20-05-2024 05:00 PM" está no banco de dados

     Scenario: Cadastro de um Evento com sucesso pelo Usuário Professor com descrição 

    Given O usuário "bafm" está logado como "professor"
    And O evento "Monitoria de ESS" com a data "10-07-2024 10:00 AM" não está no sistema
    When O usuário "bafm" manda uma requisição POST para "/events/signup"
    And preenche no corpo "eventName" : "Monitoria de ESS"
    And preenche no corpo "description" : "Monitoria da disciplina Engenharia de Software e Sistemas"
    And preenche no corpo "responsibleTeacher" : "Breno Miranda"
    And preenche no corpo "eventDateAndTime" : "10-07-2024 10:00 AM"
    Then O sistema retorna "201 Created"
    And A mensagem "Evento cadastrado com sucesso" é exibida
    And O evento "Monitoria de ESS" na data "10-07-2024 10:00 AM" está no banco de dados

    Scenario: Cadastro de um evento sem sucesso pelo Usuário Professor (já está cadastrado no sistema)
    Given O usuário "bafm" está logado como "professor"
    And O evento "Reunião Geral - RobôCIn" na data "20-05-2024 05:00 PM" já está presente no sistema
    When O usuário "bafm" manda uma requisição POST para "/events/signup"
    And preenche no corpo "eventName" : "Reunião Geral - RobôCIn"
    And preenche no corpo "description" : ""
    And preenche no corpo "responsibleTeacher" : "Edna Barros"
    And preenche no corpo "eventDateAndTime" : "20-05-2024 05:00 PM"
    Then O sistema retorna "400"
    And A mensagem "Event already exists" é exibida

    Scenario: Cadastro de um evento sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo eventName) 

    Given O usuário "bafm" está logado como "professor"
    When O usuário "bafm" manda uma requisição POST para "/events/signup"
    And preenche no corpo "eventName" : ""
    And preenche no corpo "responsibleTeacher" : "Edna Barros"
    And preenche no corpo "eventDateAndTime" : "20-05-2024 05:00 PM"
    Then O sistema retorna "400 Bad Request"
    And A mensagem "Informações obrigatórias não preenchidas" é exibida

    Scenario: Cadastro de um evento sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo eventDateAndTime) 

    Given O usuário "bafm" está logado como "professor"
    When O usuário "bafm" manda uma requisição POST para "/events/signup"
    And preenche no corpo "eventName" : "Reunião Geral - RobôCIn"
    And preenche no corpo "responsibleTeacher" : "Edna Barros"
    And preenche no corpo "eventDateAndTime" : ""
    Then O sistema retorna "400 Bad Request"
    And A mensagem "Informações obrigatórias não preenchidas" é exibida

    Scenario: Cadastro de um evento sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo responsibleTeacher) 

    Given O usuário "bafm" está logado como "professor"
    When O usuário "bafm" manda uma requisição POST para "/events/signup"
    And preenche no corpo "eventName" : "Reunião Geral - RobôCIn"
    And preenche no corpo "responsibleTeacher" : ""
    And preenche no corpo "eventDateAndTime" : "20-05-2024 05:00 PM"
    Then O sistema retorna "400 Bad Request"
    And A mensagem "Informações obrigatórias não preenchidas" é exibida



