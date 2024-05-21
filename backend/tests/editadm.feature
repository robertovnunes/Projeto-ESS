Feature:  Editar ou Remover a Disciplina / Assunto do usuário Administrador

As a Administrador
I want to Editar ou Remover uma Disciplina e/ou Assunto
So that eu consiga manter controle dos dados do meu sistema e remover dados que não são mais úteis.


Scenario: Remoção de uma disciplina com sucesso pelo Administrador com sucesso

    Given Eu estou na página de “Disciplinas”
    And  Eu vejo a aba “Ver Disciplinas”, e “Ver eventos”
    And Eu estou logado como “Administrador”
    When  Eu abro a aba “Ver Disciplinas”
    And Eu vejo as disciplinas “Engenharia de Software e Sistemas”, “Gerenciamento de Dados e Informações” e “Sistemas Digitais”
    And Eu vejo as opções “Remover” e “Editar”
    When Eu clico na opção “Remover” da Disciplina “Sistemas Digitais”
    And Eu confirmo com “Sim” na opção de confirmação
    Then a disciplina “Sistemas Digitais” não está mais no sistema
    And Eu não vejo mais a Disciplina “Sistemas Digitais” na lista de Disciplinas


Scenario: Remoção de um evento pelo Administrador com sucesso

    Given Eu estou na página de “Disciplinas”
    And  Eu vejo a aba “Ver Disciplinas”, e “Ver eventos”
    And Eu sou um usuário do tipo “Administrador”
    When  Eu abro a aba “Ver Eventos”
    And Eu vejo os eventos “Monitoria de Engenharia de Software e Sistemas”, “Reunião Geral- RobôCIn” e “Prova de Estatística”
    And Eu vejo as opções “Remover” e “Editar” 
    When Eu clico na opção “Remover” do evento “Prova de Estatística”
    And Eu confirmo com “Sim” na opção de confirmação
    Then o evento  “Prova de Estatística” não está mais no sistema
    And Eu não vejo mais  o evento “Prova de Estatística” na lista de Eventos

    Cenário 3: Edição de funcionalidades de uma Disciplina pelo Administrador com sucesso
    Given Eu estou na página de “Disciplinas”
    And  Eu vejo a aba “Ver Disciplinas”, e “Ver eventos”
    And Eu estou logado como “Administrador”
    When  Eu abro a aba “Ver Disciplinas”
    And Eu vejo as disciplinas “Engenharia de Software e Sistemas”, “Gerenciamento de Dados e Informações” e “Sistemas Digitais”
    And Eu vejo as opções “Remover” e “Editar”
    When Eu clico na opção “Editar” da Disciplina “Sistemas Digitais”
    And Eu vejo os campos “Nome da Disciplina”, “Código da Disciplina”, “Horário”, “Professor Responsável’, “Curso”, “Período” e “Descrição”
    And eu troco o “Horário da Disciplina” de “20/05 A 28/05 MON THU 10:00” para “20/05 A 28/05 MON WED 08:00”
    And eu troco o “Professor Responsável” de “Breno Miranda” para “Paulo Borba”
    And eu troco o “Curso” de “Engenharia Da Computação” para “Ciências Da Computação”
    When Eu clico na opção “Sim” de “Confirmar essas alterações?”
    Then As informações foram salvas nos dados da disciplina “Sistemas Digitais”
    And Eu vejo a mensagem “Salvo com Sucesso!”


Scenario: Edição de funcionalidades de um Evento pelo Administrador com sucesso

    Given Eu estou na página de “Disciplinas”
    And Eu vejo a aba “Ver Disciplinas”, e “Ver eventos”
    And Eu estou logado como “Administrador”
    When  Eu abro a aba “Ver Eventos”
    And Eu vejo os eventos “Monitoria de Engenharia de Software e Sistemas”, “Reunião Geral- RobôCIn” e “Prova de Estatística”
    And Eu vejo as opções “Remover” e “Editar” 
    When Eu clico na opção “Editar” do evento “Prova de Estatística”
    And Eu vejo os campos “Nome do Evento”, “Horário”, “Professor Responsável’ e “Descrição”
    And eu troco o “Horário do Evento” de “20/05 THU 10:00” para “28/05 MON 08:00”
    And eu troco o “Professor Responsável” de “Breno Miranda” para “Tsang Ing Ren”
    When Eu clico na opção “Sim” de “Confirmar essas alterações?”
    Then As informações foram salvas nos dados do evento “Prova de Estatística”
    And Eu vejo a mensagem “Salvo com Sucesso!”


Scenario: Remoção de uma disciplina pelo Administrador sem sucesso
        
    Given Eu estou na página de “Disciplinas”
    And  Eu vejo a aba “Ver Disciplinas”, e “Ver eventos”
    And Eu estou logado como “Administrador”
    When  Eu abro a aba “Ver Disciplinas”
    And Eu vejo as disciplinas “Engenharia de Software e Sistemas”, “Gerenciamento de Dados e Informações” e “Sistemas Digitais”
    And Eu vejo as opções “Remover” e “Editar”
    When Eu clico na opção “Remover” da Disciplina “Sistemas Digitais”
    And Eu confirmo com “Não” na opção de confirmação
    Then eu volto para a página “Ver Disciplinas”
    And Eu vejo as disciplinas “Engenharia de Software e Sistemas”, “Gerenciamento de Dados e Informações” e “Sistemas Digitais”


Scenario: Remoção de um evento pelo Administrador sem sucesso

    Given Eu estou na página de “Disciplinas”
    And  Eu vejo a aba “Ver Disciplinas”, e “Ver eventos”
    And Eu estou logado como “Administrador”
    When  Eu abro a aba “Ver Eventos”
    And Eu vejo os eventos “Monitoria de Engenharia de Software e Sistemas”, “Reunião Geral- RobôCIn” e “Prova de Estatística”
    And Eu vejo as opções “Remover” e “Editar” 
    When Eu clico na opção “Remover” do evento “Prova de Estatística”
    And Eu confirmo com “Não” na opção de confirmação
    Then eu volto para a página “Ver Eventos”
    And Eu vejo os eventos “Monitoria de Engenharia de Software e Sistemas”, “Reunião Geral- RobôCIn” e “Prova de Estatística”


