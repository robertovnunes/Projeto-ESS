Feature: Remoção de uma disciplina ou evento pelo Usuário Administrador

    Scenario: Remoção de uma disciplina sem sucesso pelo Administrador
        Given O usuário "secgrad" está logado como "admin"
        When O usuário "secgrad" manda uma requisição DELETE para "/disciplines/MD103"
        Then O sistema retorna "404"
        And A mensagem "Event Not Found" é exibida

    Scenario: Remoção de um evento sem sucesso pelo Administrador 
        Given O usuário "secgrad" está logado como "admin"
        And O evento "Prova de Estatística" de id "15" não está no sistema
        When O usuário "secgrad" manda uma requisição DELETE para "/events/15"
        Then O sistema retorna "404"
        And A mensagem "Event Not Found" é exibida

    


