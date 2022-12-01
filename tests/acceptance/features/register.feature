Feature: Register
  It displays input fields to provide their details for registering to the application
  As a user
  I want to provide my details
  So that i can register to the Application 
 
  Scenario Outline: User should be registered successfully with valid inputs
    Given a user has navigated to the Register page
    When  the user provides valid details and clicks on register
    Then message "Registered successfully" should be displayed on the register page

  Scenario Outline: User should not be able to register with invalid inputs
    Given a user has navigated to the Registration page to register
    When the user provides invalid details and clicks on register
    Then error message "*please provide correct PAN Number" "*please provide correct contact number" should be displayed on the register page

  Scenario Outline: User clicking on login Link
    Given a user has navigated to the Register page to navigate to login page
    When the user clicks on Login link
    Then user should be directed to Login page