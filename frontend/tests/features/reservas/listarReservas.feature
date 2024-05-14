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

    Scenario: Ver lista de reservas com erro
        Given que eu estou na "página de reservas"
        When eu seleciono "ver reservas"
        Then eu vejo uma mensagem de "erro"

    Scenario: ver lista de reservas com apenas uma reserva
        Given que eu estou na "página de reservas"
        When eu seleciono "ver reservas"
        Then eu vejo 1 reservas listadas
