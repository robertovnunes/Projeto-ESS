Feature: Listando recursos e equipamentos
  As a usuário administrador
  I want ver a lista de recursos de uma sala
  So that eu possa ver, remover ou editar os recursos disponíveis na sala

    Scenario: Listar recursos de uma sala
        Given que eu estou na página de "listagem de salas"
        When eu seleciono "Recursos" da sala "E428"
        Then eu devo ver a lista de recursos da sala "E428"
        And eu devo ver o recurso "Projetor"
        And eu devo ver o recurso "Computador"
        And eu devo ver o recurso "TV"
        And eu devo ver o recurso "Ar condicionado"

    Scenario: Listar recursos de uma sala sem recursos
        Given que eu estou na página de "listagem de salas"
        When eu seleciono "Recursos" da sala "E429"
        Then eu devo ver a lista de recursos da sala "E429"
        And eu devo ver a mensagem "Nenhum recurso disponível"