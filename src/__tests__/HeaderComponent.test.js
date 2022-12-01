import { render, fireEvent, act, cleanup } from '@testing-library/react';
import HeaderComponent from "../components/HeaderComponent";
import { Provider } from "react-redux";
import store from '../redux/store';
import { BrowserRouter } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

afterEach(cleanup)


afterEach(cleanup);
jest.mock("react-redux", () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  dispatch: jest.fn()
}))



describe("Header Component Test Suite", () => {
  beforeEach(() => {
    useSelector.mockImplementation(callback => {
      return callback({
        registeredUsers: ["tej@gmail.com"],
        users: [{
          email: "tej@gmail.com",
          password: "Tej@123@"
        }],
        validated: false,
        currentUser: "tej@gmail.com",
      })
    })
  })

  test("testcase for logout link ", async () => {
    const mockfun = jest.fn()
    const { getByTestId, getByRole, getByText } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);

    await act(async () => {
      fireEvent.click(getByText("Sign out"), { preventDefault: () => console.log("event") });
    })
    expect(getByTestId("sign-out")).toBeInTheDocument();

  })


  test("testcase for apply loan link", async () => {
    const mockfun = jest.fn()
    const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);

    await act(async () => {
      fireEvent.click(getByTestId("apply-loan"));
    })
    expect(getByTestId("apply-loan")).toBeInTheDocument();

  })
  
  test("testcase for update link", async () => {
    const mockfun = jest.fn()
    const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);

    await act(async () => {
      fireEvent.click(getByTestId("update"));
    })
    expect(getByTestId("update")).toBeInTheDocument();

  })

  test("testcase for loan details link ", async () => {
    const mockfun = jest.fn()
    const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);

    await act(async () => {
      fireEvent.click(getByTestId("loan-details"));
    })
    expect(getByTestId("loan-details")).toBeInTheDocument();

  })

})