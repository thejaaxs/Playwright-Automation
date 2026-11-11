Feature: CheckBoxes Interaction

  Scenario: Verify CheckBoxes States
    Given I Open the CheckBoxes Page
    When I check the first checkbox and uncheck the second checkbox
    Then the first checkbox should be checked
    And the second checkbox should be unchecked
