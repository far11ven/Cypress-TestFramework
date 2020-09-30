Feature: Navigating to Google.com and verifying title
    @test
    Scenario: Perform Navigation
        Given I open the Google web url
        Then I verify title of web page as 'Google'