Feature: Cadastro de uma Disciplina por um professor
As a Professor
I want to Cadastrar uma Disciplina e/ou um Assunto
So that Eu possa usar essa Disciplina e/ou Assunto para reservar uma sala

    Scenario: Cadastro de uma Disciplina com sucesso pelo Usuário Professor com descrição, curso e periódo vazios
    Given O usuário "bafm" está logado como "professor"
    And A disciplina "Engenharia de Software e Sistemas" de id "IF686" não está no sistema
    When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    And preenche no corpo "nome" : "Engenharia de Software e Sistemas"
    And preenche no corpo "id" : "IF686"
    And preenche no corpo "responsibleTeacher" : "Breno Miranda"
    And preenche no corpo "horario" : "20/05/2024 a 28/05/2024 13:00 TUE THU"
    # And preenche no corpo "description" : ""
    # And preenche no corpo "disciplineCurso" : ""
    # And preenche no corpo "disciplinePeriodo" : ""
    Then O sistema retorna "201"
    And A mensagem "Disciplina cadastrada com sucesso" é exibida
    And A disciplina "Engenharia de Software e Sistemas" de id "IF686" está no banco de dados

    # Scenario: Cadastro de uma Disciplina com sucesso pelo Usuário Professor com descrição e periódo vazios
    #     Given O usuário "bafm" está logado como "professor"
    #     And A disciplina "Paradigmas e Linguagens Computacionais" de id "IF690" não está no sistema
    #     When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    #     And preenche no corpo "nome" : "Paradigmas e Linguagens Computacionais"
    #     And preenche no corpo "id" : "IF690"
    #     And preenche no corpo "responsibleTeacher" : "Andre Luis"
    #     And preenche no corpo "horario" : "20/05/2024 a 28/05/2024 08:00 MON WED"
    #     And preenche no corpo "description" : ""
    #     And preenche no corpo "disciplineCurso" : "Engenharia da Computação"
    #     And preenche no corpo "disciplinePeriodo" : ""
    #     Then O sistema retorna "201"
    #     And A mensagem "Disciplina cadastrada com sucesso" é exibida
    #     And A disciplina "Paradigmas e Linguagens Computacionais" de id "IF690" está no banco de dados

    # Scenario: Cadastro de uma Disciplina com sucesso pelo Usuário Professor com curso e periódo vazios
    #     Given O usuário "bafm" está logado como "professor"
    #     And A disciplina "História e Futuro da Computação" de id "IF691" não está no sistema
    #     When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    #     And preenche no corpo "nome" : "História e Futuro da Computação"
    #     And preenche no corpo "id" : "IF691"
    #     And preenche no corpo "responsibleTeacher" : "Germano Crispim"
    #     And preenche no corpo "horario" : "20/05/2024 a 28/05/2024 10:00 TUE"
    #     And preenche no corpo "description" : "Materia com seminário"
    #     And preenche no corpo "disciplineCurso" : ""
    #     And preenche no corpo "disciplinePeriodo" : ""
    #     Then O sistema retorna "201"
    #     And A mensagem "Disciplina cadastrada com sucesso" é exibida
    #     And A disciplina "História e Futuro da Computação" de id "IF691" está no banco de dados

    # Scenario: Cadastro de uma Disciplina com sucesso pelo Usuário Professor com descrição e curso vazios
    #     Given O usuário "bafm" está logado como "professor"
    #     And A disciplina "Sistemas Digitais" de id "IF640" não está no sistema
    #     When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    #     And preenche no corpo "nome" : "Sistemas Digitais"
    #     And preenche no corpo "id" : "IF640"
    #     And preenche no corpo "responsibleTeacher" : "Abel"
    #     And preenche no corpo "horario" : "21/08/2024 a 31/12/2024 10:00 MON FRI"
    #     And preenche no corpo "description" : ""
    #     And preenche no corpo "disciplineCurso" : ""
    #     And preenche no corpo "disciplinePeriodo" : "4"
    #     Then O sistema retorna "201"
    #     And A mensagem "Disciplina cadastrada com sucesso" é exibida
    #     And A disciplina "Sistemas Digitais" de id "IF640" está no banco de dados

    # Scenario: Cadastro de uma Disciplina com sucesso pelo Usuário Professor 
    #     Given O usuário "bafm" está logado como "professor"
    #     And A disciplina "Introdução a Computação" de id "IF323" não está no sistema
    #     When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    #     And preenche no corpo "nome" : "Introdução a Computação"
    #     And preenche no corpo "id" : "IF323"
    #     And preenche no corpo "responsibleTeacher" : "Kleber Vieira"
    #     And preenche no corpo "horario" : "21/08/2024 a 31/12/2024 13:00 MON"
    #     And preenche no corpo "description" : "IC"
    #     And preenche no corpo "disciplineCurso" : "Engenharia da Computação"
    #     And preenche no corpo "disciplinePeriodo" : "1"
    #     Then O sistema retorna "201"
    #     And A mensagem "Disciplina cadastrada com sucesso" é exibida
    #     And A disciplina "Introdução a Computação" de id "IF323" está no banco de dados

    # Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Professor (já está cadastrado no sistema)
    #     Given O usuário "bafm" está logado como "professor"
    #     And A disciplina "Engenharia de Software e Sistemas" de id "IF686" já está presente no sistema
    #     When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    #     And preenche no corpo "nome" : "Engenharia de Software e Sistemas"
    #     And preenche no corpo "id" : "IF686"
    #     And preenche no corpo "responsibleTeacher" : "Breno Miranda"
    #     And preenche no corpo "horario" : "20/05/2024 a 28/05/2024 13:00 TUE THU"
    #     Then O sistema retorna "400"
    #     And A mensagem "Discipline already exists" é exibida

    # Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo nome) 
    #     Given O usuário "bafm" está logado como "professor"
    #     When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    #     And preenche no corpo "nome" : ""
    #     And preenche no corpo "id" : "IF686"
    #     And preenche no corpo "responsibleTeacher" : "Breno Miranda"
    #     And preenche no corpo "horario" : "20/05/2024 a 28/05/2024 13:00 TUE THU"
    #     Then O sistema retorna "400 Bad Request"
    #     And A mensagem "Informações obrigatórias não preenchidas" é exibida

    # Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo id) 
    #     Given O usuário "bafm" está logado como "professor"
    #     When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    #     And preenche no corpo "nome" : "Engenharia de Software e Sistemas"
    #     And preenche no corpo "id" : ""
    #     And preenche no corpo "responsibleTeacher" : "Breno Miranda"
    #     And preenche no corpo "horario" : "20/05/2024 a 28/05/2024 13:00 TUE THU"
    #     Then O sistema retorna "400 Bad Request"
    #     And A mensagem "Informações obrigatórias não preenchidas" é exibida

    # Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo horario) 
    #     Given O usuário "bafm" está logado como "professor"
    #     When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    #     And preenche no corpo "nome" : "Engenharia de Software e Sistemas"
    #     And preenche no corpo "id" : "IF686"
    #     And preenche no corpo "responsibleTeacher" : "Breno Miranda"
    #     And preenche no corpo "horario" : ""
    #     Then O sistema retorna "400 Bad Request"
    #     And A mensagem "Informações obrigatórias não preenchidas" é exibida

    # Scenario: Cadastro de uma Disciplina sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo responsibleTeacher)
    #     When O usuário "bafm" manda uma requisição POST para "/disciplines/signup"
    #     And preenche no corpo "nome" : "Engenharia de Software e Sistemas"
    #     And preenche no corpo "id" : "IF686"
    #     And preenche no corpo "responsibleTeacher" : ""
    #     And preenche no corpo "horario" : "20/05/2024 a 28/05/2024 13:00 TUE THU"
    #     Then O sistema retorna "400 Bad Request"
    #     And A mensagem "Informações obrigatórias não preenchidas" é exibida


    