Feature: update
  It displays required input fields to update Account details
  As a user
  I want to update Account Details
  So that i can Apply to loan with updated Account Details
 
  Scenario Outline: User should not be able to update without Logging In
    Given a user has navigated to the update page
    When the user provides invalid values and clicks on update without logging in
    Then message "*Please login to update Account Details" should be displayed on the update page


  Scenario Outline: User should not be able to update with invalid values
    Given a user on update page
    When the user provides invalid  Account details and clicks on update without logging in
    Then error message "*please provide your 12 digit account number" should be displayed on the update page
