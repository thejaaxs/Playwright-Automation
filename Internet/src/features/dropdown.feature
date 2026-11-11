Feature: Native Dropdown

    Background:
        Given I open the dropdown page

    Scenario Outline: Select And Verify a Dropdown Option
        When I select the dropdown option "<value>"
        Then the selected dropdown value should be "<value>"

    Examples:
            | value |
            | 1     |
            | 2     |