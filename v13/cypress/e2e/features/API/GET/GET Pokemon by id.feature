 @all @API
 Feature: Pokemon GET /pokemon/{id} by id
    @smoke @test
    Scenario: Fetch data for a pokemon using API and verify it
        Given As a user I want to execute Pokemon GET api for Pokemon "pikachu"
        Then Verify '@get_pokemon_data' response status code is 200
        When I save the user id in Test Store
        And I make a GET request on '/pokemon/{id}' endpoint with the stored id
        Then Verify '@get_pokemon_data_by_id' response status code is 200
        And Verify response details for Pokemon "pikachu"


