
Scenario: Cadastro de um Evento com sucesso pelo Usuário Professor com descrição vazia

Given O usuário "bafm" está logado como "professor"
And O evento "Reunião Geral - RobôCIn" não está no sistema
When O usuário "bafm" manda uma requisição POST para "/eventos/signup"
And preenche no corpo "eventName" : "Reunião Geral - RobôCIn"
And preenche no corpo "responsibleTeacher" : "Edna Barros"
And preenche no corpo "eventDateAndTime" : "20-05-2024 05:00 PM"
Then O sistema retorna "201"
And A mensagem "Evento criado com sucesso" é exibida
And O evento "Reunião Geral - RobôCIn" está no banco de dados

Scenario: Cadastro de um Evento com sucesso pelo Usuário Professor com descrição 

Given O usuário "bafm" está logado como "professor"
And O evento "Monitoria de ESS" não está no sistema
When O usuário "bafm" manda uma requisição "/POST/eventos/signup"
And preenche no corpo "eventName" : "Monitoria de ESS"
And preenche no corpo "description" : "Monitoria de Engenharia de Software e Sistemas"
And preenche no corpo "responsibleTeacher" : "Breno Miranda"
And preenche no corpo "eventDateAndTime" : "2024-07-10 10:00 AM"
Then O sistema retorna "201 Created"
And A mensagem "Evento criado com sucesso" é exibida
And O evento "Monitoria de ESS" está no banco de dados

Scenario: Cadastro de um evento sem sucesso pelo Usuário Professor (já está cadastrado no sistema)

Given O usuário "bafm" está logado como "professor"
And O evento "Reunião Geral - RobôCIn" já está presente no sistema
When O usuário "bafm" manda uma requisição "/POST/eventos/signup"
And preenche no corpo "eventName" : "Reunião Geral - RobôCIn"
And preenche no corpo "responsibleTeacher" : "Edna Barros"
And preenche no corpo "eventDateAndTime" : "20-05-2024 05:00 PM"
Then O sistema retorna "400 Bad Request"
And A mensagem "Event already exists" é exibida


Scenario: Cadastro de um evento sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo eventName) 

Given O usuário "bafm" está logado como "professor"
And O evento "Reunião Geral - RobôCIn" não está no sistema
When O usuário "bafm" manda uma requisição "/POST/eventos/signup"
And preenche no corpo "eventName" : ""
And preenche no corpo "responsibleTeacher" : "Edna Barros"
And preenche no corpo "eventDateAndTime" : "20-05-2024 05:00 PM"
Then O sistema retorna "400 Bad Request"
And A mensagem "Informações obrigatórias não preenchidas" é exibida

Scenario: Cadastro de um evento sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo eventDateAndTime) 

Given O usuário "bafm" está logado como "professor"
And O evento "Reunião Geral - RobôCIn" não está no sistema
When O usuário "bafm" manda uma requisição "/POST/eventos/signup"
And preenche no corpo "eventName" : "Reunião Geral - RobôCIn"
And preenche no corpo "responsibleTeacher" : "Edna Barros"
And preenche no corpo "eventDateAndTime" : ""
Then O sistema retorna "400 Bad Request"
And A mensagem "Informações obrigatórias não preenchidas" é exibida

Scenario: Cadastro de um evento sem sucesso pelo Usuário Professor(faltam informações obrigatórias - campo responsibleTeacher) 

Given O usuário "bafm" está logado como "professor"
And O evento "Reunião Geral - RobôCIn" não está no sistema
When O usuário "bafm" manda uma requisição "/POST/eventos/signup"
And preenche no corpo "eventName" : "Reunião Geral - RobôCIn"
And preenche no corpo "responsibleTeacher" : ""
And preenche no corpo "eventDateAndTime" : "20-05-2024 05:00 PM"
Then O sistema retorna "400 Bad Request"
And A mensagem "Informações obrigatórias não preenchidas" é exibida



