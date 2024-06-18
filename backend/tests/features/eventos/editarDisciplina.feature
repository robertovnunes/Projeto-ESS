Feature: Edição de funcionalidades de uma Disciplina pelo Professor

Scenario: Edição de todas as funcionalidades de uma Disciplina com sucesso pelo Professor 
    Given O usuário "bafm" está logado como "professor"
    And A disciplina "Matemática Discreta" de id "MD101" já está presente no sistema
    When O usuário "bafm" manda uma requisição PUT para "/disciplines/MD101"
    And preenche no corpo "nome" : "Matemática Discreta para Computação"
    And preenche no corpo "disciplineID" : "MD102"
    And preenche no corpo "responsibleTeacher" : "Anjolina Grisi"
    And preenche no corpo "horario" : "23/05/2024 a 31/12/2024 08:00 MON WED"
    And preenche no corpo "description" : "Estudo dos fundamentos matemáticos discretos para a computação."
    And preenche no corpo "disciplineCurso" : "Ciências da Computação"
    And preenche no corpo "disciplinePeriodo" : "4"
    Then O sistema retorna "200"
    And A mensagem "Salvo com Sucesso!" é exibida
    And As informações sobre a disciplina "Matemática Discreta para Computação" de id "MD102" foram salvas no banco de dados

Scenario: Edição de algumas funcionalidades de uma Disciplina com sucesso pelo Professor -- campo description e disciplineCurso
    Given O usuário "bafm" está logado como "professor"
    And A disciplina "Algoritmos e Estruturas de Dados" de id "AE301" já está presente no sistema
    When O usuário "bafm" manda uma requisição PUT para "/disciplines/AE301"
    And preenche no corpo "description" : "Estudo de algoritmos clássicos e estruturas de dados fundamentais, agora para ciências da computação."
    And preenche no corpo "disciplineCurso" : "Ciências da Computação"
    Then O sistema retorna "200"
    And A mensagem "Salvo com Sucesso!" é exibida
    And As informações sobre a disciplina "Algoritmos e Estruturas de Dados" de id "AE301" foram salvas no banco de dados

Scenario: Edição de uma funcionalidade de uma Disciplina com sucesso pelo Professor -- campo horario
    Given O usuário "bafm" está logado como "professor"
    And A disciplina "Sistemas Operacionais" de id "IF943" já está presente no sistema
    When O usuário "bafm" manda uma requisição PUT para "/disciplines/IF943"
    And preenche no corpo "horario" : "23/05/2024 a 30/06/2024 10:00 AM MON WED FRI"
    Then O sistema retorna "200"
    And A mensagem "Salvo com Sucesso!" é exibida
    And As informações sobre a disciplina "Sistemas Operacionais" de id "IF943" foram salvas no banco de dados

# Scenario: Edição de algumas funcionalidades de um Evento com sucesso pelo Professor - eventName e responsibleTeacher
#     Given O usuário "bafm" está logado como "professor"
#     And O evento "Hackathon Pride" na data "22-07-2024 04:00 PM" já está presente no sistema
#     When O usuário "bafm" manda uma requisição PUT para "/events/3"
#     And preenche no corpo "eventName" : "Hackathon Pride <3"
#     And preenche no corpo "responsibleTeacher" : "Paulo Marcos"
#     Then O sistema retorna "200"
#     And A mensagem "Salvo com Sucesso!" é exibida
#     And As informações sobre o evento "Hackathon Pride <3" de data "22-07-2024 04:00 PM" foram salvas no banco de dados
# Scenario: Edição de apenas uma funcionalidade de um Evento com sucesso pelo Professor - eventDateAndTime

#     Given O usuário "bafm" está logado como "professor"
#     And O evento "Workshop Machine Learning" na data "05-08-2024 04:00 PM" já está presente no sistema
#     When O usuário "bafm" manda uma requisição PUT para "/events/4"
#     And preenche no corpo "eventDateAndTime" : "05-08-2024 05:00 PM"
#     Then O sistema retorna "200"
#     And A mensagem "Salvo com Sucesso!" é exibida
#     And As informações sobre o evento "Workshop Machine Learning" de data "05-08-2024 05:00 PM" foram salvas no banco de dados

# Scenario: Edição de apenas uma funcionalidade de um Evento sem sucesso pelo Professor - eventDateAndTime

#     Given O usuário "bafm" está logado como "professor"
#     And O evento "Workshop Machine Learning" na data "05-08-2024 04:00 PM" já está presente no sistema
#     When O usuário "bafm" manda uma requisição PUT para "/events/4"
#     And preenche no corpo "eventDateAndTime" : "06-08-2024 17:00"
#     Then O sistema retorna "400"
#     And A mensagem "Formato de data inválido" é exibida