Feature: Sign up

    Scenario: Create a new user with correct data to Sign Up
        Given I am at the sign up page
        And I set an email
        And I set a password
        And I confirm the password
        And I click to sing up
        Then I login with the new signed up user

    Scenario: Create a new user with incorrect password confirmation to Sign Up
        Given I am at the sign up page
        And I set an email
        And I set a password
        And I confirm the password with a different value
        Then I should see an error message "Please enter the same password"

    Scenario: Create a new user with incorrect password to Sign Up
        Given I am at the sign up page
        And I set an email
        And I set an invalid password
        And I confirm the invalid password
        Then I should see an error message "Please enter at least 8 characters"
