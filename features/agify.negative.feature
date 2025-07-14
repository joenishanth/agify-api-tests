Feature: Receive expected Error Messages from Agify API
    As a user of the Agify API
    I want to receive relevant error messages for error scenarios

    Scenario: Verify invalid API key returns an error
        Given I am a user
        When I send a request to agify with invalid ApiKey
        Then the API should respond with status code 401
        And the error message should be "Invalid API key"

    # All good
    Scenario: Verirfy Name is required for age prediction
        Given I am a user
        When I send a request to agify without a name
        Then the API should respond with status code 422
        And the error message should be "Missing 'name' parameter"


