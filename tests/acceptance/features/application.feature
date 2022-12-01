Feature: Application success flow
  As a user
  I want to provide my credentials and loan details
  So that i can apply for the loan  
 
  Scenario Outline: User should be able to apply for loan
    Given a user on Registration page
    When the user registers with valid details and clicks on login link
    Then user provides valid credentials and clicks on login
    Then user updates account details 
    Then user provides loan details and clicks on apply
    Then should be able to see message "Loan Submitted Successfully"
    Then applied loan details "gk@gmail.com" "1111-1111-1111"  will be shown to user in loandetails page