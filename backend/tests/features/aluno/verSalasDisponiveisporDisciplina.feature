Feature: Verificar as salas reservadas por determinada Disciplina do usuário Aluno

Scenario: Verificar as salas reservadas por determinada Disciplina do usuário Aluno com sucesso
        Given O usuário "mgc3" está logado como "aluno"
        And A disciplina "Metodologia Científica" de id "IF946" existe no sistema
        When O usuário "mgc3" manda uma requisição GET para "/disciplines/IF946"
        Then O sistema retorna "200"
        And A mensagem "Discipline found" é exibida
        And O usuário "mgc3" recebe um JSON com as salas reservadas "Grad003" e "Anfiteatro"

Scenario: Verificar as salas reservadas por determinada Disciplina do usuário Aluno sem sucesso (Disciplina não existe)
        Given O usuário "mgc3" está logado como "aluno"
        And A disciplina "Arquitetura de Arroz" de id "IF9489" não existe no sistema
        When O usuário "mgc3" manda uma requisição GET para "/disciplines/IF9489"
        Then O sistema retorna "404"
        And A mensagem "Discipline not found" é exibida

Scenario: Verificar as salas reservadas por determinada Disciplina do usuário Aluno sem sucesso (Disciplina não tem salas reservadas)
        Given O usuário "mgc3" está logado como "aluno"
        And A disciplina "Banco de Dados" de id "IF945" existe no sistema
        When O usuário "mgc3" manda uma requisição GET para "/disciplines/IF945"
        Then O sistema retorna "400"
        And A mensagem "Discipline has no salas" é exibida
       
