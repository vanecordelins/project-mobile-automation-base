Feature: Forms

  Scenario: Fill a form
    Given I am on the Forms screen
    When I add data at the Input Field
    And I select an option from the Dropdown
    And I click at the Active button
    Then I should see a popup with the message "This button is active"

  Scenario: Check input data at the Forms screen
    Given I am on the Forms screen
    When I add data at the Input Field
    Then I should see the correct data displayed at the You have typed field

  Scenario: Run form tests using JSON data
    Given I access the Forms screen
    Then I fill the form using the data from the JSON file


