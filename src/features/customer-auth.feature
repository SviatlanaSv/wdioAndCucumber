Feature: Customer registration and sign-in

  Background:
    Given the application is available
    And the customer is not signed in

  @registration
  Scenario: Successful customer registration
    When the customer opens the Login page
    And chooses to register a new account
    And the registration form is displayed
    And the customer enters a first name and last name
    And the customer enters a date of birth in "YYYY-MM-DD" format
    And the customer enters a street, postal code, city and state
    And the customer selects a country
    And the customer enters a phone number
    And the customer enters a unique email address
    And the customer sets a valid password that meets the rules
    And the customer submits the registration form
    Then the customer is created

  @signin
  Scenario: Successful sign-in with the newly registered account
    Given a customer account exists using the email and password created during registration
    And the customer is on the Login page
    When the customer enters the registered email and password
    And the customer chooses to sign in
    Then the customer is returned to the application as an authenticated user
    And the application shows the customer account area
    And the header displays the signed-in customer
    And no authentication error is shown
