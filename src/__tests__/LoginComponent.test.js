import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import LoginComponent from "../components/LoginComponent";
import { Provider } from "react-redux";
import store from '../redux/store';
import { BrowserRouter } from "react-router-dom";
import { act } from "react-dom/test-utils";
import { useSelector, useDispatch } from 'react-redux';

afterEach(cleanup)
jest.mock("react-redux", () => ({
    ...jest.requireActual('react-redux'),
    useSelector: jest.fn(),
    dispatch: jest.fn()
}))



describe("Login test cases", () => {
    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({
                registeredUsers: ["tej@gmail.com"],
                users: [{
                    email: "tej@gmail.com",
                    password: "Tej@123@"
                }],
                validated: false
            })
        })
    })
    test("test case for validation of password and email input", async () => {
        const { getByTestId } = render(<Provider store={store}>
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        </Provider>)
        await act(async () => {
            fireEvent.change(getByTestId("email-input"), { target: { value: "tej@gmail.com" } })
            fireEvent.change(getByTestId("password-test"), { target: { value: "Tej@123@" } })

        })
        const btnIncrement = screen.getByTestId("btn");
        expect(getByTestId("email-input")).toBeInTheDocument();
        expect(getByTestId("password-test")).toBeInTheDocument();
        await act(async () =>
            fireEvent.click(btnIncrement,{
                email: "tej@gmail.com",
                password: "Tej@123@"
              }))
    }

    )

})


describe("Test cases for valid credentials", () => {
    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({
                registeredUsers: ["tej@gmail.com"],
                users: [{
                    email: "tej@gmail.com",
                    password: "Tej@123@"
                }],
                validated: true
            })
        })
    })


    test("test for validation of password input", async () => {
        const { getByTestId } = render(<Provider store={store}>
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        </Provider>)

        await act(async () => {
            fireEvent.change(getByTestId("email-input"), { target: { value: "tej@gmail" } })
            fireEvent.change(getByTestId("password-test"), { target: { value: "Tej@123@" } })

        })
        const btnIncrement = screen.getByTestId("btn");
        expect(btnIncrement).toBeInTheDocument();
        await act(async () =>
            fireEvent.click(btnIncrement))
    }

    )

})



describe("Registered user validations", () => {
    beforeEach(() => {
        useSelector.mockImplementation(callback => {
            return callback({
                registeredUsers: ["tejaswini@gmail.com"],
                users: [{

                }],
                validated: false
            })
        })
    })

    test(" test for validation of password input", async () => {
        const { getByTestId } = render(<Provider store={store}>
            <BrowserRouter>
                <LoginComponent />
            </BrowserRouter>
        </Provider>)


        await act(async () => {

            fireEvent.change(getByTestId("email-input"), { target: { value: "tej@gmail" } })
            fireEvent.change(getByTestId("password-test"), { target: { value: "Tej@123@" } })

        })
        const btnIncrement = screen.getByTestId("btn");

        await act(async () =>
            fireEvent.click(btnIncrement))
    }

    )

})


test(" test for error validation of password input", async () => {
    render(<Provider store={store}>
        <BrowserRouter>
            <LoginComponent />
        </BrowserRouter>
    </Provider>)
    const btnIncrement = screen.getByTestId("btn");
    await act(async () =>
        fireEvent.click(btnIncrement))

})


