Feature: Professor comentando

  Scenario: Professor criando um comentário
    Given Eu estou na página "/professor"
    When eu escolho a opção "Criar Comentário"
    Then Eu sou redirecionado para a página "/professor/comentario"
    When Eu adiciono um comentário com destinatário "ADM2" e texto "Este é um comentário de teste" como professor
    Then Eu vejo uma mensagem de sucesso "Comentário adicionado com sucesso"
