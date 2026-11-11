Feature: CheckBoxes Interaction

  Background:
    Given I open the CheckBoxes Page

  Scenario Outline: Scenario Outline name: Verify CheckBoxes States
    When I check the first checkbox and uncheck the second checkbox
    Then the first checkbox should be checked
    And the second checkbox should be unchecked
