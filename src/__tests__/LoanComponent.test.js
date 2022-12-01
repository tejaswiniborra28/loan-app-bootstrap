import React from "react";
import { render, screen, waitFor, fireEvent, act, cleanup } from '@testing-library/react';
import LoanComponent from "../components/LoanComponent";
import { Provider } from "react-redux";
import store from '../redux/store';
import { BrowserRouter } from "react-router-dom";
import { useSelector } from 'react-redux';

afterEach(cleanup)


jest.mock("react-redux", () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  dispatch: jest.fn()
}))



describe("Test suite to render loan component when account details are available", () => {

  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback({
        registeredUsers: ["tej@gmail.com"],
        users: [{
          email: "tej@gmail.com",
          password: "Tej@123@",
          AccountDetails: {
            accountNumber: "2222-3333-5555",
            Acctype: "Savings",
            cardType: "icici"
          },
          loanDetails: {
            applicationDate: new Date(),

            loanAmount: 50,
            purpose: "Home Loan",
            duration: 5,

          }
        },
        {
          email: "teja@gmail.com",
          password: "Tej@123@",
          AccountDetails: {
            accountNumber: "2222-3333-5555",
            Acctype: "Savings",
            cardType: "icici"
          },
          loanDetails: {
            applicationDate: new Date(),

            loanAmount: 50,
            purpose: "Home Loan",
            duration: 5,

          }
        }],
        currentUser: "tej@gmail.com",
        validated: true
      })
    })
  })

  test("test case for validating input values for loan", async () => {

    const mockfun = jest.fn()
    const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><LoanComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
    await act(async () => {
      fireEvent.change(getByTestId("income-test"), { target: { value: 20 } })
      fireEvent.change(getByTestId("loan-amount"), { target: { value: 50 } })
      fireEvent.change(getByTestId("duration-test"), { target: { value: "5" } })
      fireEvent.change(getByTestId("purpose-test"), { target: { value: "Car Loan" } })

    })
    await act(async () => {
      fireEvent.click(getByTestId("btn-loan"));
    })
    expect(getByTestId("income-test")).toBeInTheDocument();
    expect(getByTestId("loan-amount")).toBeInTheDocument();
    expect(getByTestId("duration-test")).toBeInTheDocument();
    expect(getByTestId("purpose-test")).toBeInTheDocument();

  })


  test("test case for validating error input values", async () => {
    const mockfun = jest.fn()
    const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><LoanComponent onSubmit={mockfun} /></BrowserRouter></Provider>);

    await act(async () => {
      fireEvent.click(getByTestId("btn-loan"));
    })
  })


  test("test for error validation of input value home loan", async () => {
    const mockfun = jest.fn()
    const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><LoanComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
    await act(async () => {
      fireEvent.change(getByTestId("income-test"), { target: { value: "" } })
      fireEvent.change(getByTestId("loan-amount"), { target: { value: "" } })
      fireEvent.change(getByTestId("purpose-test"), { target: { value: "Home Loan" } })

    })
    await act(async () => {
      fireEvent.click(getByTestId("btn-loan"));
    })
  })


  test("when Account details are present", async () => {
    const mockfun = jest.fn()
    const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><LoanComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
    await act(async () => {
      fireEvent.change(getByTestId("income-test"), { target: { value: 20 } })
      fireEvent.change(getByTestId("loan-amount"), { target: { value: 50 } })
      fireEvent.change(getByTestId("duration-test"), { target: { value: "5" } })
      fireEvent.change(getByTestId("purpose-test"), { target: { value: "Car Loan" } })

    })
    await act(async () => {
      fireEvent.click(getByTestId("btn-loan"));
    })
  }
  )

})

describe("Test suite to render loan component when account details are not available", () => {

  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback({
        registeredUsers: ["tej@gmail.com"],
        users: [{
          email: "tej@gmail.com",
          password: "Tej@123@",
          loanDetails: {
            applicationDate: new Date(),

            loanAmount: 50,
            purpose: "Home Loan",
            duration: 5,

          }
        },
        {
          email: "teja@gmail.com",
          password: "Tej@123@",
          AccountDetails: {
            accountNumber: "2222-3333-5555",
            Acctype: "Savings",
            cardType: "icici"
          },
          loanDetails: {
            applicationDate: new Date(),

            loanAmount: 50,
            purpose: "Home Loan",
            duration: 5,

          }
        }],
        currentUser: "tej@gmail.com",
        validated: true
      })
    })
  })
  test("when Account details are present", async () => {
    const mockfun = jest.fn()
    const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><LoanComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
    await act(async () => {
      fireEvent.change(getByTestId("income-test"), { target: { value: 20 } })
      fireEvent.change(getByTestId("loan-amount"), { target: { value: 50 } })
      fireEvent.change(getByTestId("duration-test"), { target: { value: "5" } })
      fireEvent.change(getByTestId("purpose-test"), { target: { value: "Car Loan" } })

    })
    await act(async () => {
      fireEvent.click(getByTestId("btn-loan"));
    })
  }
  )

})


describe("Test suite to render loan component when user not logged In", () => {

  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback({
        registeredUsers: ["tej@gmail.com"],
        users: [{
          email: "tej@gmail.com",
          password: "Tej@123@",
          loanDetails: {
            applicationDate: new Date(),

            loanAmount: 50,
            purpose: "Home Loan",
            duration: 5,

          }
        },
        {
          email: "teja@gmail.com",
          password: "Tej@123@",
          AccountDetails: {
            accountNumber: "2222-3333-5555",
            Acctype: "Savings",
            cardType: "icici"
          },
          loanDetails: {
            applicationDate: new Date(),

            loanAmount: 50,
            purpose: "Home Loan",
            duration: 5,

          }
        }],
        currentUser: "",
        validated: true
      })
    })
  })
  test("render Loan Component when user not logged In", async () => {
    const mockfun = jest.fn()
    const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><LoanComponent onSubmit={mockfun} /></BrowserRouter></Provider>);

  }
  )

})