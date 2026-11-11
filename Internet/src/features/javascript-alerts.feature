Feature: Javascript Alerts

  Background:
    Given I open the Javascript alerts page

  Scenario: Accept a Javascript alert
    When I accept the Javascript alert
    Then I should see the result "I am a JS Alert"
