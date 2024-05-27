Feature: As a usuario
    I want to adicionar um recurso ao banco de dados 
    So that eu posso armazenar todos os recusros de uma sala

    Scenario: Adicionando recurso com sucesso
        Given não existe o recurso "Ar condicionado midea" com "patrimonio" "1098642"
        When eu recebo uma requisição "/POST" 
        And nome "Ar condicionado midea"
        And patrimonio "1098642"
        Then o recurso "Ar condicionado midea" com patrimonio "1098642" está no banco de dados

    Scenario: Adicionando recurso com nome vazio
        Given eu recebo uma requisição "/POST"
        And nome "" com patrimonio "5583147"
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Nome não pode ser vazio"

    Scenario: Adicionando recurso sem partimonio
        Given eu recebo uma requisição "/POST"
        And nome "Monitor phillips" com patrimonio ""
        Then eu envio uma resposta de "erro" com codigo "404"
        And mensagem "Patrimonio não pode ser vazio"

    Scenario: Adicionando recurso com partimonio duplicado
        