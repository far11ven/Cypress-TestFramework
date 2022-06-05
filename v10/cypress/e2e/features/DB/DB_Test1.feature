@DB
Feature: Test DB connection
    @smoke @test
    Scenario: Pokemon Table SQL query executions
        Given I execute select all query on pokemon DB
        When I execute selet query on pokemon DB, where name equals "pikachu"