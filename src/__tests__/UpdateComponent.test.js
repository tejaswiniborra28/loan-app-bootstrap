import { render, fireEvent, act, screen, cleanup } from '@testing-library/react';
import HeaderComponent from "../components/UpdateComponent";
import { Provider } from "react-redux";
import store from '../redux/store';
import { BrowserRouter } from "react-router-dom";
import UpdateComponent from '../components/UpdateComponent';
import { useSelector } from 'react-redux';
import * as reactRedux from 'react-redux'

jest.mock("react-redux", () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    dispatch: jest.fn()
}))


describe("Test suite to render update component when registered user is logged in", () => {
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
    test('renders Update component with valid values', async () => {
        const mockfun = jest.fn()
        const { getByTestId } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
        await act(async () => {
            fireEvent.change(getByTestId("account-number"), { target: { value: "2222-2222-2222" } });
            fireEvent.change(getByTestId("cardType"), { target: { value: "icici" } })
            fireEvent.change(getByTestId("Acctype"), { target: { value: "Current" } })
        })
        await act(async () => {
            fireEvent.click(getByTestId("btn-update"), { Acctype: "Current", cardType: "icici", accountNumber: "2222-2222-2222" });
        })
        expect(getByTestId("account-number")).toBeInTheDocument();
        expect(getByTestId("cardType")).toBeInTheDocument();
        expect(getByTestId("Acctype")).toBeInTheDocument();

    });

    test('renders Update component without values', async () => {
        const mockfun = jest.fn()
        const { getByTestId } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
        await act(async () => {
            fireEvent.change(getByTestId("account-number"), { target: { value: "" } });
            fireEvent.change(getByTestId("cardType"), { target: { value: "" } })
            fireEvent.change(getByTestId("Acctype"), { target: { value: "" } })
        })
        await act(async () => {
            fireEvent.click(getByTestId("btn-update"), { Acctype: "", cardType: "", accountNumber: "" });
        })
    });

    test('renders Update component with invalid account number', async () => {
        const mockfun = jest.fn()
        const { getByTestId } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
        await act(async () => {
            fireEvent.change(getByTestId("account-number"), { target: { value: "222222222" } });
            fireEvent.change(getByTestId("cardType"), { target: { value: "icici" } })
            fireEvent.change(getByTestId("Acctype"), { target: { value: "Current" } })
        })
        await act(async () => {
            fireEvent.click(getByTestId("btn-update"), { Acctype: "222222222", cardType: "icici", accountNumber: "Current" });
        })
    });

    test(" test for current user", async () => {
        const mockfun = jest.fn()
        const { getByTestId, getByRole, getByText } = render(<Provider store={store}><BrowserRouter><UpdateComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
        await act(async () => {
            fireEvent.change(getByTestId("account-number"), { target: { value: "2222-2222-2222" } });
            fireEvent.change(getByTestId("cardType"), { target: { value: "icici" } })
            fireEvent.change(getByTestId("Acctype"), { target: { value: "Current" } })
        })

        await act(async () => {
            const btnIncrement = screen.getByTestId("btn-update");
            fireEvent.click(btnIncrement, {
                accountNumber: "2222-2222-2222",
                cardType: "icici",
                Acctype: "Current"
            });
        })
    }

    )





})




describe("Test suite to render update component when user not logged in", () => {
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
                currentUser: "",
                validated: true
            })
        })
    })
    test('renders Update component  when user not logged In', async () => {
        const mockfun = jest.fn()
        const { getByTestId } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);

    })
})