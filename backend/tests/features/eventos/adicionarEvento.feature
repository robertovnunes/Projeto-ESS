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
    And A mensagem "Evento criado com sucesso" é exibida
    And O evento "Reunião Geral - RobôCIn" na data "20-05-2024 05:00 PM" está no banco de dados

   



