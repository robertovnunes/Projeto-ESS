Feature: Remover usuário
  As a administrador
  I want to remover um usuário do banco de dados
  So that usuários com credenciais obsoletas sejam retirados do sistema e não tenham mais acesso às funcionalidades dele

    Scenario: Remover um usuário com sucesso
      Given o usuário "aluno" com login "js3" está no banco de dados
      When eu recebo uma requisição "/DELETE/aluno/123456"
      Then o usuário deve ser removido do banco de dados

    Scenario: Remover um usuário que não existe
      Given o usuário "aluno" com login "js3" não está no banco de dados
      When eu recebo uma requisição "/DELETE/aluno/123456"
      Then eu envio uma resposta de "erro" com codigo "404"
      And mensagem "Usuário não existe"