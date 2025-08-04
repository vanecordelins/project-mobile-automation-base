@signup 
Feature: Sign up

  @positive 
  Scenario: Create a new user with correct data to Sign Up
    Given I am at the sign up page
    And I set an email
    And I set a password
    And I confirm the password
    And I click to sign up
    Then I handle the success popup
    Then I login with the new signed up user

  @negative 
  Scenario: Create a new user with incorrect password confirmation to Sign Up
    Given I am at the sign up page
    And I set an email
    And I set a password
    And I confirm the password with a different value
    And I click to sign up
    Then I should see an error message "Please enter the same password"

  @negative 
  Scenario: Create a new user with incorrect password to Sign Up
    Given I am at the sign up page
    And I set an email
    And I set an invalid password
    And I confirm the invalid password
    And I click to sign up
    Then I should see an error message "Please enter at least 8 characters"
