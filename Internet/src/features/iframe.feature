Feature: Iframe Interaction

    Background:
        Given I open the Iframe page

    Scenario: Replace Text In The IFrame Editor
        When I replace the iframe editor text with "Hello from Playwright"
        Then the iframe editor should contain "Hello from Playwright"