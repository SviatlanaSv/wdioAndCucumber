Feature: Customer registration and sign-in

  Background:
    Given the application is available
    And the customer is not signed in

  @registration
  Scenario: Successful customer registration
    When the customer opens the Login page 
    And chooses to register a new account 
    And the registration form is displayed 
    And the customer completes registration with valid information 
    And the customer submits the registration form 
    Then the customer is created

  @signin
  Scenario: Successful sign-in with the newly registered account
    Given a customer account exists using the email and password created during registration 
    And the customer is on the Login page 
    When the customer signs in with the registered credentials 
    Then the customer is returned to the application as an authenticated user 
    And the application shows the customer account area
