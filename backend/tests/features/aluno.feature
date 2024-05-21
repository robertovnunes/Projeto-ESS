Feature: Verificar as salas reservadas por determinada Disciplina do usuário Aluno

As a Student
I want to Verificar as salas reservadas por determinada Disciplina e/ou Assunto
So that eu consiga saber os horários e quais salas foram reservadas para uma Disciplina e/ou assunto específico



Scenario: Verificar salas Reservadas por uma Disciplina

    Given Eu estou na página de “Disciplinas”
    And Eu vejo a aba “Ver Disciplinas”, e “Ver eventos”
    And Eu estou logado como “Aluno”
    When  Eu abro a aba “Ver Disciplinas”
    And Eu vejo as disciplinas “Engenharia de Software e Sistemas”, “Gerenciamento de Dados e Informações” e “Sistemas Digitais”
    When eu clico na disciplina “Engenharia de Software e Sistemas”
    And Eu vejo um calendário assinalando as datas “20/07 MON 10:00-12:00” e “27/05 TUE 08:00-10:00”
    Then Eu consigo ver abaixo das datas a mensagem “Sala Reservada: Grad003” 


Scenario: Verificar salas Reservadas por um Evento

    Given Eu estou na página de “Disciplinas”
    And  Eu vejo a aba “Ver Disciplinas”, e “Ver eventos”
    And Eu estou logado como “Aluno”
    When  Eu abro a aba “Ver Eventos”
    And Eu vejo os eventos “Monitoria de Engenharia de Software e Sistemas”, “Reunião Geral- RobôCIn” e “Prova de Estatística”
    When eu clico no evento “Reunião Geral- RobôCIn”
    And Eu vejo um calendário assinalando a data “25/05 FRI 17:00-18:00”
    Then Eu consigo ver abaixo das datas a mensagem “Sala Reservada:Anfiteatro” 

