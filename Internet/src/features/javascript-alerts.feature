Feature: Javascript Alerts

  Background:
    Given I open the Javascript alerts page

  Scenario: Accept a Javascript alert
    When I accept the Javascript alert
    Then I should see the result "I am a JS Alert"

  Scenario: Accept a Javascript confirmation
    When I accept the Javascript confirmation
    Then I should see the result "You clicked: Ok"

  Scenario: Dismiss a Javascript confirmation
    When I dismiss the Javascript confirmation
    Then I should see the result "You clicked : Cancel"

  Scenario: Submit text to a Javascript prompt
    When I submit "Playwright prompt text" to the Javascript prompt
    Then I should see the result "You entered: Playwright prompt text"
