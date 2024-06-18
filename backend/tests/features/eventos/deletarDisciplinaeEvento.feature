Feature: Remoção de uma disciplina ou evento
    Scenario: Remoção de uma disciplina sem sucesso pelo Professor 
        Given O usuário "bafm" está logado como "professor"
        And A disciplina "Introdução a Computação" de id "IF3234" não está no sistema
        When O usuário "bafm" manda uma requisição DELETE para "/disciplines/IF3234"
        Then O sistema retorna "404"
        And A mensagem "Discipline Not Found" é exibida

    Scenario: Remoção de uma disciplina com sucesso pelo Professor
        Given O usuário "bafm" está logado como "professor"
        And A disciplina "Introdução a Programação" de id "IF232" está presente no sistema
        When O usuário "bafm" manda uma requisição DELETE para "/disciplines/IF232"
        Then O sistema retorna "200"
        And A mensagem "Disciplina removida com sucesso" é exibida
        And A disciplina "Introdução a Programação" de id "IF232" não está mais presente no sistema

    Scenario: Remoção de um evento sem sucesso pelo Professor 
        Given O usuário "bafm" está logado como "professor"
        And O evento "Prova de Estatística" de id "15" não está no sistema
        When O usuário "bafm" manda uma requisição DELETE para "/events/15"
        Then O sistema retorna "404"
        And A mensagem "Event Not Found" é exibida

    Scenario: Remoção de um evento com sucesso pelo Professor 
        Given O usuário "bafm" está logado como "professor"
        And O evento "Semana dos Calouros" de id "1" está presente no sistema
        When O usuário "bafm" manda uma requisição DELETE para "/events/1"
        Then O sistema retorna "200"
        And A mensagem "Evento removido com sucesso" é exibida
        And O evento "Semana dos Calouros" de id "1" não está mais presente no sistema



