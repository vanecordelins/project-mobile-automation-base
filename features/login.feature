Feature: Login with valid credentials

Scenario: Login with valid credentials
  Given I am on the login screen
  When I enter valid credentials
  And I click the login button
  Then I should be redirected to the main screen
