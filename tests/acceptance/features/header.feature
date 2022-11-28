Feature: Header
  It displays links to update, loan, loan details and logout button
  As a user
  I want to click on links provided
  So that i can navigate to different pages
 
  Scenario Outline: User clicking on update Link
    Given a user has navigated to the Header to naviagte to update component
    When the user clicks on update
    Then user should be directed to update page
  
  Scenario Outline: User clicking on loan Link
    Given a user has navigated to the Header to naviagte to loan component
    When the user clicks on loan
    Then user should be directed to loan page

  Scenario Outline:  User clicking on loan details Link
    Given a user has navigated to the Header to naviagte to Loan details component
    When the user clicks on loan details
    Then user should be directed to Loan details component

  Scenario Outline:  User clicking on logout button
    Given a user has navigated to the Header to logout
    When the user clicks on logout button
    Then user should be directed to login page