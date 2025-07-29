Feature: Core functionality validation

  Scenario: Login with valid credentials
    Given I am on the login screen
    When I enter a valid username and password
    And I click the login button
    Then I should be redirected to the main screen
