Feature: Aluno comentando

  Scenario: Aluno criando um comentário
    Given Eu estou na página "/aluno"
    When eu escolho a opção "Criar Comentário"
    Then Eu sou redirecionado para a página "/aluno/comentario"
    When Eu adiciono um comentário com destinatário "ADM1", secretaria responsável "secretaria de pos-grad" e texto "Este é um comentário de teste" como aluno
    Then Eu vejo uma mensagem de sucesso "Comentário adicionado com sucesso"
