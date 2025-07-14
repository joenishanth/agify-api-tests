Feature: Retrieve Age Predictions from Agify API

    As a user of the Agify API
    I want to retrieve age predictions based on names

    Scenario: Verify the Response for a Single name and Country
        Given I am a user
        When I request Agify to provide the localized age of "John" in country "US"
        Then the API should respond with status code 200
        And the response should returns Agify object

    Scenario Outline: Verify agify returns the correct name in the response
        Given I am a user
        When I send a request to agify to get the age of "<name>"
        Then the API should respond with status code 200
        And the response should contain the age of "<name>"
        Examples:
            | name     |
            | John     |
            | Michael  |
            | Benjamin |
            | Sarah    |

    Scenario: Verify the Response for a Single name and Country
        Given I am a user
        When I request Agify to provide the localized age of "John" in country "US"
        Then the API should respond with status code 200
        And the response should returns AgifyWithCountryId object

    Scenario: Verify age can be retrieved for multiple names in the same request
        Given I am a user
        When I send a GET request to agify with multiple names
        Then the API should respond with status code 200
        And the response should contains age details for the names provided

    Scenario Outline: Verify the age of a user is based on name and country
        Given I am a user
        When I request Agify to provide the localized age of "<name>" in country "<countryId>"
        Then the API should respond with status code 200
        And the response should return the age of "<name>" in Country "<countryId>" as <age>
        Examples:
            | name | countryId | age |
            | Mike | US        | 62  |
            | Mike | AU        | 66  |

    Scenario: Verify the age of a user based on name and country
        Given I am a user
        When I request Agify to provide the localized age of "Trish" in country "Australia"
        Then the API should respond with status code 200
        But the field "count" should be 0
        And the field "age" should be null
        
    Scenario: Verify NO data is returned for valid name with special characters
        Given I am a user
        When I send a request to agify to get the age of "123$#!"
        Then the API should respond with status code 200
        But the field "count" should be 0
        And the field "age" should be null





