Feature: Edição de funcionalidades de uma Disciplina e/ou Evento pelo Administrador

Scenario: Edição de uma funcionalidade de uma Disciplina com sucesso pelo Administrador -- campo horario
    Given O usuário "secgrad" está logado como "admin"
    And A disciplina "Redes de Computadores" de id "IF944" já está presente no sistema
    When O usuário "secgrad" manda uma requisição PUT para "/disciplines/IF944"
    And preenche no corpo "horario" : "23/05/2024 a 30/06/2024 11:00 AM MON WED FRI"
    Then O sistema retorna "200"
    And A mensagem "Salvo com Sucesso!" é exibida
    And As informações sobre a disciplina "Redes de Computadores" de id "IF944" foram salvas no banco de dados

Scenario: Edição de apenas uma funcionalidade de um Evento sem sucesso pelo Administrador - eventDateAndTime
    Given O usuário "secgrad" está logado como "admin"
    And O evento "Monitoria de ESS" na data "10-07-2024 10:00 AM" já está presente no sistema
    When O usuário "secgrad" manda uma requisição PUT para "/events/2"
    And preenche no corpo "eventDateAndTime" : "06-08-2024 17:00"
    Then O sistema retorna "400"
    And A mensagem "Formato de data inválido" é exibida


Scenario: Edição de algumas funcionalidades de uma Disciplina com sucesso pelo Administrador -- campo description e disciplineCurso
    Given O usuário "secgrad" está logado como "admin"
    And A disciplina "Banco de Dados" de id "IF945" já está presente no sistema
    When O usuário "secgrad" manda uma requisição PUT para "/disciplines/IF945"
    And preenche no corpo "description" : "Estudo de banco de dados relacionais e não relacionais"
    And preenche no corpo "disciplineCurso" : "Ciências da Computação"
    Then O sistema retorna "200"
    And A mensagem "Salvo com Sucesso!" é exibida
    And As informações sobre a disciplina "Banco de Dados" de id "IF945" foram salvas no banco de dados