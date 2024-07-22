Feature: Sum between two numbers
  As a user
  I want to sum two numbers
  So that I can see the result

  Scenario: Sum between two numbers sucessfull
    Given I have number "1"
    And I have number "2"
    When I run "sum(1,2)"
    Then I see "3"