Feature: Remoção de uma disciplina ou evento
    Scenario: Remoção de uma disciplina com sucesso pelo Professor com sucesso
        Given O usuário "bafm" está logado como "professor"
        And A disciplina "Introdução a Computação" de id "IF323" não está no sistema
        When O usuário "bafm" manda uma requisição DELETE para "/disciplines/IF323"
        Then O sistema retorna "404"
        And A mensagem "Discipline Not Found" é exibida

    Scenario: Remoção de uma disciplina com sucesso pelo Professor sem sucesso
        Given O usuário "bafm" está logado como "professor"
        And A disciplina "Engenharia de Software e Sistemas" de id "IF686" está presente no sistema
        When O usuário "bafm" manda uma requisição DELETE para "/disciplines/IF686"
        Then O sistema retorna "200"
        And A mensagem "Disciplina removida com sucesso" é exibida
        And A disciplina "Engenharia de Software e Sistemas" de id "IF686" não está mais presente no sistema

    Scenario: Remoção de um evento sem sucesso pelo Professor 
        Given O usuário "bafm" está logado como "professor"
        And O evento "Reunião Geral - RobôCIn" de id "3" não está no sistema
        When O usuário "bafm" manda uma requisição DELETE para "/events/3"
        Then O sistema retorna "404"
        And A mensagem "Event Not Found" é exibida

    Scenario: Remoção de um evento com sucesso pelo Professor 
        Given O usuário "bafm" está logado como "professor"
        And O evento "Reunião Geral - RobôCIn" de id "3" está presente no sistema
        When O usuário "bafm" manda uma requisição DELETE para "/disciplines/IF686"
        Then O sistema retorna "200"
        And A mensagem "Evento removido com sucesso" é exibida
        And O evento "Reunião Geral - RobôCIn" de id "3" não está mais presente no sistema



