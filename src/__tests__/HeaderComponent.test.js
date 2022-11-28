import { render, fireEvent, act, cleanup } from '@testing-library/react';
import HeaderComponent from "../components/HeaderComponent";
import { Provider } from "react-redux";
import store from '../redux/store';
import { BrowserRouter } from "react-router-dom";


afterEach(cleanup)


test("testcase for logout link ", async () => {
  const mockfun = jest.fn()
  const { getByTestId, getByRole } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);

  await act(async () => {
    fireEvent.click(getByTestId("sign-out"));
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
  
