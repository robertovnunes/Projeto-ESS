Feature: Visualizar as salas reservadas para uma disciplina
    Scenario: Visualizar as salas reservadas para uma disciplina
        Given Eu estou logado como "aluno"
        When Eu visito a página "/disciplines"
        And Eu escolho a opcao "Ver Disciplinas"
        And Eu sou redirecionado para a página "/discipline-view"
        When Eu clico no botão "Ver Salas" da disciplina "Banco de Dados"
        Then Eu vejo a mensagem "Nenhuma sala reservada"