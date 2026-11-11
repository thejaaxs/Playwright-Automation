Feature: Javascript Alerts

  Background:
    Given I open the Javascript alerts page

  Scenario Outline: Accept a Javascript alert
    When I accept the Javascript alert
    Then I should see the result "You successfully clicked an alert"

  Scenario Outline: Accept a Javascript confirmation
    When I accept the Javascript confirmation
    Then I should see the result "You clicked: Ok"

  Scenario Outline: Dismiss a Javascript confirmation
    When I dismiss the Javascript confirmation
    Then I should see the result "You clicked: Cancel"

  Scenario Outline: Submit text to a Javascript prompt
    When I submit "Playwright prompt text" to the Javascript prompt
    Then I should see the result "You entered: Playwright prompt text"
