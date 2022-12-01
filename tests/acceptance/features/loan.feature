Feature: Loan
  It displays required input fields to apply for the loan
  As a user
  I want to provide loan details
  So that i can apply for Loan  
 
  Scenario Outline: User should not be access loan form without logging in
    Given a user has navigated to the Loan page without logging In
    When user tries to access header
    Then error "Please login to access your account" should be shown to the user instead of loan form

  Scenario Outline: User should be able to apply loan with valid inputs
    Given a user has navigated to the Loan page
    When the user provides valid values to register , login and access loan form
    Then error message " *Please update Account details before applying for Loan" should be shown to user 
  