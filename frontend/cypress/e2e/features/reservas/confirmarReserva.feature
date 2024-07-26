Feature: confirmar reservass
  As a administrador
  I want to verificar e confirmar reservas de sala e equipamentos
  So that eu possa garantir que as reservas são válidas

  Scenario: Confirmar reserva de sala
    Given que eu estou na página de "reservas" da sala "E428"
    And eu vejo uma reserva de sala pendente
    When eu confirmo a reserva de sala
    Then eu vejo uma mensagem de confirmação
    And a reserva é marcada como confirmada
    And o usuário é notificado por email

  Scenario: Confirmar reserva de equipamento
    Given que eu estou na página de "reservas" do equipamento "Projetor"
    And eu vejo uma reserva de equipamento pendente
    When eu confirmo a reserva de equipamento
    Then eu vejo uma mensagem de confirmação
    And a reserva é marcada como confirmada
    And o usuário é notificado por email