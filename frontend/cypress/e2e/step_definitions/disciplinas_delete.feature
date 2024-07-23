Feature: Deletar uma disciplina com sucesso

Scenario: Deletar uma disciplina com sucesso pelo professor
    Given Eu estou logado como "professor"
    When Eu visito a página "/disciplines"
    And Eu escolho a opcao "Editar Disciplina Existente"
    And Eu sou redirecionado para a página "/disciplines-list"
    And Eu escolho a opção "Deletar" da disciplina "Introdução a Programação"
    Then A disciplina "Introdução a Programação" não deve mais existir
