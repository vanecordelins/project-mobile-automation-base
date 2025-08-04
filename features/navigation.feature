@navigation
Feature: Screen navigation

  @positive
  Scenario: Navigate to the Sign Up screen
    Given I am on the Home screen
    When I click on the Login button
    Then I click on the Sign Up button
    Then I should see the sign up page

  @positive
  Scenario: Navigate back to the Home screen from Sign Up
    Given I am on the sign up page
    When I click on the Home button
    Then I should be back on the home screen

  @positive
  Scenario: Navigate at the Swipe page
    Given I am on the Swipe page
    Then I swipe Right
    And comunnity informations are displayed
    When I click on the Home button
    Then I should be back on the home screen
