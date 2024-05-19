Feature: As a usuário
  I want to ver a lista de reservas de sala
  So that I vejo todas as salas resevadas

  Scenario: Ver lista de reservas
    Given que eu estou na "página de reservas"
    And eu tenho 5 "reservas de sala"
    When eu seleciono "ver reservas"
    Then eu vejo 5 reservas listadas

  Scenario: Ver lista de reservas vazia
    Given que eu estou na "página de reservas"
    And eu tenho 0 "reservas de sala"
    When eu seleciono "ver reservas"
    Then eu vejo uma mensagem de "nenhuma reserva"

  Scenario: Ver lista de reservas por data
    Given que eu estou na "página de reservas"
    And eu tenho 5 "reservas de sala"
    When eu seleciono "ver reservas"
    And eu seleciono "filtrar por data"
    And eu escolho a data "2019-10-10"
    Then eu vejo 5 reservas listadas

  Scenario: ver lista de reservas por sala
    Given que eu estou na "página de reservas"
    And eu tenho 5 "reservas de sala"
    When eu seleciono "ver reservas"
    And eu seleciono "filtrar por sala"
    And eu escolho a sala "E428"
    Then eu vejo 5 reservas listadas

