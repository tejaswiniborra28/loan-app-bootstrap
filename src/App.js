import React from 'react';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import LoanComponent from './components/LoanComponent';
import LoanDetailsComponent from './components/LoanDetailsComponent';
import NoPageComponent from './components/NoPageComponent';
import UpdateComponent from './components/UpdateComponent';
//import './App.css';
import "./Application.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (<Provider store={store}>
    <div className="App">
      <BrowserRouter basename="/loan-application">
        <Routes>
          <Route path="/" element={<LoginComponent />} />
          <Route path="login" element={<LoginComponent />} />
          <Route path="register" element={<RegisterComponent />} />
          <Route path="loanApp" element={<LoanComponent />} />
          <Route path="loandetails" element={<LoanDetailsComponent />} />
          <Route path="update" element={<UpdateComponent />} />
          <Route path="*" element={<NoPageComponent />} />

        </Routes>
      </BrowserRouter>

    </div>
  </Provider>
  );
}

export default App;
