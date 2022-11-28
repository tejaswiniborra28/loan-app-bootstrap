import { render, fireEvent, act, cleanup } from '@testing-library/react';
import HeaderComponent from "../components/UpdateComponent";
import { Provider } from "react-redux";
import store from '../redux/store';
import { BrowserRouter } from "react-router-dom";

test('renders Update component with valid values',async () => {
    const mockfun = jest.fn()
    const { getByTestId } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
    await act(async () => {
        fireEvent.change(getByTestId("account-number"), { target: { value: "2222-2222-2222" } });
        fireEvent.change(getByTestId("cardType"), { target: { value: "icici" } })
        fireEvent.change(getByTestId("Acctype"), { target: { value: "Current" } })
    })
    await act(async () => {
        fireEvent.click(getByTestId("btn-update"),{Acctype:"Current",cardType:"icici",accountNumber:"2222-2222-2222"});
    })
    expect(getByTestId("account-number")).toBeInTheDocument();
    expect(getByTestId("cardType")).toBeInTheDocument();
    expect(getByTestId("Acctype")).toBeInTheDocument();
   
  });

  test('renders Update component without values',async () => {
    const mockfun = jest.fn()
    const { getByTestId } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
    await act(async () => {
        fireEvent.change(getByTestId("account-number"), { target: { value: "" } });
        fireEvent.change(getByTestId("cardType"), { target: { value: "" } })
        fireEvent.change(getByTestId("Acctype"), { target: { value: "" } })
    })
    await act(async () => {
        fireEvent.click(getByTestId("btn-update"),{Acctype:"",cardType:"",accountNumber:""});
    })
  });

  test('renders Update component with invalid account number',async () => {
    const mockfun = jest.fn()
    const { getByTestId } = render(<Provider store={store}><BrowserRouter><HeaderComponent onSubmit={mockfun} /></BrowserRouter></Provider>);
    await act(async () => {
        fireEvent.change(getByTestId("account-number"), { target: { value: "222222222" } });
        fireEvent.change(getByTestId("cardType"), { target: { value: "icici" } })
        fireEvent.change(getByTestId("Acctype"), { target: { value: "Current" } })
    })
    await act(async () => {
        fireEvent.click(getByTestId("btn-update"),{Acctype:"222222222",cardType:"icici",accountNumber:"Current"});
    })
  });


