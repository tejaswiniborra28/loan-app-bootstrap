Feature: Loan
  It displays required input fields to apply for the loan
  As a user
  I want to provide loan details
  So that i can apply for Loan  
 
  Scenario Outline: User should be able to apply loan with valid inputs
    Given a user has navigated to the Loan page
    When the user provides valid values and clicks on apply
    Then error message " *Please update Account details before applying for Loan" should be shown to user 
  
  Scenario Outline:  User should not be able to apply loan with invalid inputs
    Given a user has navigated to the Loan page but entered incorrect values
    When the user provides invalid values and clicks on apply
    Then message "*Income earned is required" "*Loan amount is required" should be displayed on the Loan page