Feature: Remover aluno
  As a administrador
  I want to remover um aluno do banco de dados
  So that alunos com credenciais obsoletas sejam retirados do sistema e não tenham mais acesso às funcionalidades dele

    Scenario: Remover um aluno com sucesso
      Given o usuário aluno com login "js3" está no banco de dados
      When eu recebo uma requisição DELETE para o endpoint "/alunos/js3" do administrador de login "9472"
      Then o aluno de login "js3" foi removido do banco de dados 
      And eu recebo com codigo "204"