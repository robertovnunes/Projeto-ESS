Feature: Cadastro de uma Disciplina por um Administrador
As a Administrador
I want to Cadastrar uma Disciplina e/ou um Assunto
So that Eu possa usar essa Disciplina e/ou Assunto para reservar uma sala

    Scenario: Cadastro de uma Disciplina com sucesso pelo Usuário Administrador 
        Given O usuário "secgrad" está logado como "admin"
        And A disciplina "Introdução à Inteligência Artificial" de id "IF401" não está no sistema
        When O usuário "secgrad" manda uma requisição POST para "/disciplines/signup"
        And preenche no corpo "nome" : "Introdução à Inteligência Artificial"
        And preenche no corpo "disciplineID" : "IF401"
        And preenche no corpo "responsibleTeacher" : "Marcos Oliveira"
        And preenche no corpo "horario" : "15/09/2024 a 30/11/2024 09:00 AM TUE THU"
        And preenche no corpo "description" : "Este curso aborda os fundamentos e aplicações básicas de inteligência artificial."
        And preenche no corpo "disciplineCurso" : "Engenharia da Computação"
        And preenche no corpo "disciplinePeriodo" : "4"
        Then O sistema retorna "201"
        And A mensagem "Disciplina cadastrada com sucesso" é exibida
        And A disciplina "Introdução à Inteligência Artificial" de id "IF401" está no banco de dados

    Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Administrador (já está cadastrado no sistema)
        Given O usuário "secgrad" está logado como "admin"
        And A disciplina "Engenharia de Software e Sistemas" de id "IF686" já está presente no sistema
        When O usuário "secgrad" manda uma requisição POST para "/disciplines/signup"
        And A disciplina "Introdução à Inteligência Artificial" de id "IF401" não está no sistema
        When O usuário "secgrad" manda uma requisição POST para "/disciplines/signup"
        And preenche no corpo "nome" : "Introdução à Inteligência Artificial"
        And preenche no corpo "disciplineID" : "IF401"
        And preenche no corpo "responsibleTeacher" : "Marcos Oliveira"
        And preenche no corpo "horario" : "15/09/2024 a 30/11/2024 09:00 AM TUE THU"
        And preenche no corpo "description" : "Este curso aborda os fundamentos e aplicações básicas de inteligência artificial."
        And preenche no corpo "disciplineCurso" : "Engenharia da Computação"
        And preenche no corpo "disciplinePeriodo" : "4"
        Then O sistema retorna "400"
        And A mensagem "Discipline already exists" é exibida

    Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Administrador(faltam informações obrigatórias - campo nome) 
        Given O usuário "secgrad" está logado como "admin"
        When O usuário "admin" manda uma requisição POST para "/disciplines/signup"
        And preenche no corpo "nome" : ""
        And preenche no corpo "disciplineID" : "IF401"
        And preenche no corpo "responsibleTeacher" : "Marcos Oliveira"
        And preenche no corpo "horario" : "15/09/2024 a 30/11/2024 09:00 AM TUE THU"
        And preenche no corpo "description" : "Este curso aborda os fundamentos e aplicações básicas de inteligência artificial."
        And preenche no corpo "disciplineCurso" : "Engenharia da Computação"
        And preenche no corpo "disciplinePeriodo" : "4"
        Then O sistema retorna "400 Bad Request"
        And A mensagem "Informações obrigatórias não preenchidas" é exibida

    Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Administrador(faltam informações obrigatórias - campo disciplineID) 
        Given O usuário "secgrad" está logado como "admin"
        When O usuário "admin" manda uma requisição POST para "/disciplines/signup"
        And preenche no corpo "nome" : "Introdução à Inteligência Artificial"
        And preenche no corpo "disciplineID" : ""
        And preenche no corpo "responsibleTeacher" : "Marcos Oliveira"
        And preenche no corpo "horario" : "15/09/2024 a 30/11/2024 09:00 AM TUE THU"
        And preenche no corpo "description" : "Este curso aborda os fundamentos e aplicações básicas de inteligência artificial."
        And preenche no corpo "disciplineCurso" : "Engenharia da Computação"
        And preenche no corpo "disciplinePeriodo" : "4"
        Then O sistema retorna "400 Bad Request"
        And A mensagem "Informações obrigatórias não preenchidas" é exibida

    Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Administrador(input errado - campo horario) 
        Given O usuário "secgrad" está logado como "admin"
        When O usuário "secgrad" manda uma requisição POST para "/disciplines/signup"
        And preenche no corpo "nome" : "Introdução à Inteligência Artificial"
        And preenche no corpo "disciplineID" : "IF401"
        And preenche no corpo "responsibleTeacher" : "Marcos Oliveira"
        And preenche no corpo "horario" : "15/09/2024 a 30/11/2024 09:00 TUE THU"
        And preenche no corpo "description" : "Este curso aborda os fundamentos e aplicações básicas de inteligência artificial."
        And preenche no corpo "disciplineCurso" : "Engenharia da Computação"
        And preenche no corpo "disciplinePeriodo" : "4"
        Then O sistema retorna "400 Bad Request"
        And A mensagem "Formato de data inválido" é exibida



    