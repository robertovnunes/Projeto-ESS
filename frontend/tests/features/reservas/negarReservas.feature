Feature: negar reservas
  As a administrador
  I want to verificar e negar reservas de salas e equipamentos
  So that eu possa liberar a reserva para outro usuário

  Scenario: negar reserva de sala
    Given que eu estou na página de "reservas" da sala "E428"
    And eu tenho uma reserva pendente
    When eu clico em "verificar"
    And eu vejo a reserva pendente
    When eu escolho "negar"
    And eu preencho o motivo da negação com "Sala em manutenção"
    Then eu vejo a reserva negada
    And o solicitante é notificado

  Scenario: negar reserva de equipamento
    Given que eu estou na página de "reservas" do equipamento "Projetor"
    And eu tenho uma reserva pendente
    When eu clico em "verificar"
    And eu vejo a reserva pendente
    When eu escolho "negar"
    And eu preencho o motivo da negação com "Equipamento em empréstimo"
    Then eu vejo a reserva negada
    And o solicitante é notificado