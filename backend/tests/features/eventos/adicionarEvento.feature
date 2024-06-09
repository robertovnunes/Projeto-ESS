
Scenario: Cadastro de um Evento com sucesso

Given Eu estou na página de “Disciplinas”
And  Eu vejo a aba “Cadastrar Disciplina”, “Cadastrar Evento”, “Ver Disciplinas” e “Ver eventos”
And Eu estou logado como “Professor”
When  Eu abro a aba “Cadastrar Evento”
And eu preencho “ Reunião Geral - Robô CIn” na informação “Nome do Evento”
And eu preencho “Edna Barros” como “Professor Responsável”
And eu coloco  “20-05-2024 05:00 PM” na aba “Horário”
And Eu seleciono a opção “Cadastrar”
Then ele vê a mensagem “Evento Cadastrado com Sucesso”
And ele vê uma opção para “Voltar ao início”
And vejo uma opção para “Reservar uma sala”

Scenario: Cadastro de um evento sem sucesso( já está cadastrado no sistema)

Given Eu estou na página de “Disciplinas”
And  Eu vejo a aba “Cadastrar Disciplina”, “Cadastrar Evento”, “Ver Disciplinas” e “Ver eventos”
And Eu estou logado como “Professor”
When  Eu abro a aba “Cadastrar Evento”
And eu preencho “ Reunião Geral - RobôCIn” na informação “Nome do Evento”
And eu preencho “Edna Barros” como “Professor Responsável”
And eu coloco  “20-05-2024 05:00 PM” na aba “Horário”
And Eu seleciono a opção “Cadastrar”
Then eu vejo a mensagem “Evento já cadastrado”
And vejo uma opção para “Voltar ao início” 
And vejo uma opção “Tentar Novamente”

Scenario: Cadastro de um evento sem sucesso( faltam informações obrigatórias)
Given Eu estou na página de “Disciplinas”
And  Eu vejo a aba “Cadastrar Disciplina”, “Cadastrar Evento”, “Ver Disciplinas” e “Ver eventos”
And Eu estou logado como “Professor”
When  Eu abro a aba “Cadastrar Evento”
And eu preencho  “ ” na informação “Nome do Evento”
And eu preencho “Edna Barros” como “Professor Responsável”
And eu coloco  “20-05-2024 05:00 PM” na aba “Horário”
And Eu seleciono a opção “Cadastrar”
Then eu vejo a mensagem “Faltam informações obrigatórias”
And vejo uma opção para “Voltar ao início” 
And vejo uma opção “Tentar Novamente”


