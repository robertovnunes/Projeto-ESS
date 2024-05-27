Scenario: Cadastrando um novo usuario
Given Eu estou na pagina  "cadastro de professores"
And Eu estou logado como "administrador"
And o "professor" com login "cs8" nao esta cadastrado no sistema
When Eu adiciono o "professor" "Caio Santos" de login "cs8", de matricula "8979462" e senha "sKasw9NO95g4" no sistema
Then Eu continuo na pagina "cadastro de professores"
And Eu vejo uma mensagem de sucesso "Cadastro realizado com sucesso!"
And o "professor" de login "cs8" foi devidamente adicionado

Scenario: Tentando cadastrar um usuario já cadastrado
Given Eu estou na pagina  "cadastro de professores"
And Eu estou logado como "administrador"
And o "professor" com login "ms7" nao esta cadastrado no sistema
When Eu adiciono o professor "Maria Silva" de login "ms7", de matrícula "8979351" e senha "ahs6J9kMsc@dU4" no sistema
Then Eu continuo na pagina "cadastro de professores"
And Eu vejo uma mensagem de erro "ERRO! Usuário já cadastrado."
And o "professor" de login "ms7" não foi adicionado novamente

Scenario: Login bem-sucedido de um usuário
Given Eu estou na página "login"
And o usuario de login "js3" e senha "senhaCorreta" está cadastrado no sistema
When Eu tento entrar no sistema com login "js3" e senha "senhaCorreta"
Then Eu sou redirecionado para "página principal"
And eu vejo o perfil de "professor"

Scenario: login mal-sucedido devido a credenciais incorretas
Given Eu estou na página "login"
And o usuario de login "js3" e senha "senhaCorreta" está cadastrado no sistema
When Eu tento entrar no sistema com login "js3" e senha "senhaIncorreta"
Then Eu continuo na página "login"
And Eu vejo uma mensagem de erro "Invalid username or password"

Scenario: Sair de uma conta
Given Eu estou logado em uma conta
When Eu escolho a opção "Sair da conta"
Then  Eu sou redirecionado para a página "login"