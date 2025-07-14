# Agify-Api-Tests

# The framework is built using Jest, SuperTest and Cucumberjs

## Pre-requisite:
1. Nodejs V.22 is required to compile and run the tests
3. Install the vscode extension: Cucumber (Gherkin) Full Support


## How to run the tests:
1. npm install
2. npm run api-test

## How  to generate html report:
1. npm generate-report

## Framework:
1. Tests/scenarios can be found inside "features" folder
2. Implementation of steps can be found in "steps" folder
3. CucumberJs -> world object is used to share data between steps in a scenario
4. cucumber Hooks are to log Scenario and Steps for demonstration purpose
