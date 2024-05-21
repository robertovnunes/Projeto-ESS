Feature: Cria uma disciplina / assunto para ser usado para reservar a sala do usuário Professor
As a Professor
I want to Cadastrar uma Disciplina e/ou um Assunto
So that Eu possa usar essa Disciplina e/ou Assunto para reservar uma sala


Scenario: Cadastro de uma Disciplina com sucesso

Given Eu estou na página de “Disciplinas”
And Eu vejo a aba “Cadastrar Disciplina”, “Cadastrar Evento”, “Ver Disciplinas” e “Ver eventos”
And Eu estou logado como “Professor”
When Eu abro a aba “Cadastrar Disciplina”
And eu preencho “IF686” na informação “Código da Disciplina”
And preencho “ Engenharia de Software e Sistemas” na informação “Nome da Disciplina”
And preencho “Breno Miranda” como “Professor Responsável”
And eu coloco “20/05/2024 a 28/05/2024 13:00 TUE THU” na aba “Horário”
And Eu seleciono a opção “Cadastrar”
Then eu vejo a mensagem “Disciplina Cadastrada com Sucesso”
And vejo uma opção para “Voltar ao início” 
And vejo uma opção para “Reservar uma sala”

Scenario: Cadastro de um Evento com sucesso

Given Eu estou na página de “Disciplinas”
And  Eu vejo a aba “Cadastrar Disciplina”, “Cadastrar Evento”, “Ver Disciplinas” e “Ver eventos”
And Eu estou logado como “Professor”
When  Eu abro a aba “Cadastrar Evento”
And eu preencho “ Reunião Geral - Robô CIn” na informação “Nome do Evento”
And eu preencho “Edna Barros” como “Professor Responsável”
And eu coloco  “20/05/2024 17:00 FRI” na aba “Horário”
And Eu seleciono a opção “Cadastrar”
Then ele vê a mensagem “Evento Cadastrado com Sucesso”
And ele vê uma opção para “Voltar ao início”
And vejo uma opção para “Reservar uma sala”

Scenario: Cadastro de uma disciplina sem sucesso(já está cadastrada no sistema)

Given Eu estou na página de “Disciplinas”
And Eu vejo a aba “Cadastrar Disciplina”, “Cadastrar Evento”, “Ver Disciplinas” e “Ver eventos”
And Eu estou logado como “Professor”
When Eu abro a aba “Cadastrar Disciplina”
And eu preencho “IF686” na informação “Código da Disciplina”
And preencho “ Engenharia de Software e Sistemas” na informação “Nome da Disciplina”
And preencho “Breno Miranda” como “Professor Responsável”
And eu coloco “20/05/2024 a 28/05/2024 13:00 TUE THU” na aba “Horário”
And Eu seleciono a opção “Cadastrar”
Then eu vejo a mensagem “Disciplina já cadastrada”
And vejo uma opção para “Voltar ao início” 
And vejo uma opção “Tentar Novamente”

Scenario: Cadastro de um evento sem sucesso( já está cadastrado no sistema)

Given Eu estou na página de “Disciplinas”
And  Eu vejo a aba “Cadastrar Disciplina”, “Cadastrar Evento”, “Ver Disciplinas” e “Ver eventos”
And Eu estou logado como “Professor”
When  Eu abro a aba “Cadastrar Evento”
And eu preencho “ Reunião Geral - RobôCIn” na informação “Nome do Evento”
And eu preencho “Edna Barros” como “Professor Responsável”
And eu coloco  “20/05/2024 17:00 FRI” na aba “Horário”
And Eu seleciono a opção “Cadastrar”
Then eu vejo a mensagem “Evento já cadastrado”
And vejo uma opção para “Voltar ao início” 
And vejo uma opção “Tentar Novamente”

Scenario:  Cadastro de uma disciplina sem sucesso(faltam informações obrigatórias)
Given Eu estou na página de “Disciplinas”
And Eu vejo a aba “Cadastrar Disciplina”, “Cadastrar Evento”, “Ver Disciplinas” e “Ver eventos”
And Eu estou logado como “Professor”
When Eu abro a aba “Cadastrar Disciplina”
And eu preencho “IF686” na informação “Código da Disciplina”
And preencho “ Engenharia de Software e Sistemas” na informação “Nome da Disciplina”
And preencho “” como “Professor Responsável”
And eu coloco “20/05/2024 a 28/05/2024 13:00 TUE THU” na aba “Horário”
And Eu seleciono a opção “Cadastrar”
Then eu vejo a mensagem “Faltam informações obrigatórias”
And vejo uma opção para “Voltar ao início” 
And vejo uma opção “Tentar Novamente”
Cenário 6: Cadastro de um evento sem sucesso( faltam informações obrigatórias)
Given Eu estou na página de “Disciplinas”
And  Eu vejo a aba “Cadastrar Disciplina”, “Cadastrar Evento”, “Ver Disciplinas” e “Ver eventos”
And Eu estou logado como “Professor”
When  Eu abro a aba “Cadastrar Evento”
And eu preencho  “ ” na informação “Nome do Evento”
And eu preencho “Edna Barros” como “Professor Responsável”
And eu coloco  “20/05/2024 17:00 FRI” na aba “Horário”
And Eu seleciono a opção “Cadastrar”
Then eu vejo a mensagem “Faltam informações obrigatórias”
And vejo uma opção para “Voltar ao início” 
And vejo uma opção “Tentar Novamente”
