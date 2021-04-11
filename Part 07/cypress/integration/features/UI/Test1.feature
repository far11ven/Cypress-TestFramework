@UI
Feature: Navigating to Google.com and verifying title and match result keyword
    @smoke @test
    Scenario: Perform Search
        Given I open the Google web url
        Then I verify title of web page as 'Google'
        When I provide search query as "Pokemon"
        Then Verify first search result to match "Pokemon" keyword