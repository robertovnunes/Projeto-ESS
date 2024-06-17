Feature: Edição de funcionalidades de um Evento pelo Professor

Scenario: Edição de todas as funcionalidades de um Evento com sucesso pelo Professor 
    Given O usuário "bafm" está logado como "professor"
    And O evento "Hackathon" na data "21-07-2024 04:00 PM" já está presente no sistema
    When O usuário "bafm" manda uma requisição PUT para "/events/2"
    And preenche no corpo "nome" : "Estatística e Probabilidade de Computação"
    And preenche no corpo "eventName" : "Hackton C++"
    And preenche no corpo "description" : "Uma competição de programação que dura 24 horas, usando a linguagem C++."
    And preenche no corpo "responsibleTeacher" : "Ricardo Martins",
    And preenche no corpo "eventDateAndTime" : "21-07-2024 03:00 PM"
    Then O sistema retorna "200"
    And A mensagem "Salvo com Sucesso!" é exibida
    And As informações sobre o evento "Hackton C++" de data "21-07-2024 03:00 PM" foram salvas no banco de dados
