Feature: Browser Windows

    Background:
        Given I open the windows page

    Scenario: Open a new tab and return to the origial tab
        When I open the link in a new tab
        Then the new tab URL should be "https://the-internet.herokuapp.com/windows/new"
        When I switch back to the original tab
        Then the original tab URL should be "https://the-internet.herokuapp.com/windows"