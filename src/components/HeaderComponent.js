import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../redux/userActions";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  const userEmail = useSelector((state) => state.currentUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logoutFunc = (e) => {
    e.preventDefault();
    dispatch(logout())
    navigate("/login")
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>LOAN APPLICATION</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link data-testid="apply-loan" > <Link className="link-style" to="/loanApp">  Apply Loan</Link></Nav.Link>
            <Nav.Link data-testid="loan-details"><Link className="link-style" to="/loandetails">Loan Details</Link>  </Nav.Link>

          </Nav>
          <Nav>
            <Nav.Link data-testid="update"><Link className="link-style" to="/update">Update</Link></Nav.Link>
            <Nav.Link eventKey={2} data-testid="sign-out">
              <Link className="link-style" onClick={logoutFunc}>{userEmail ? "Sign out" : "Sign In"}</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
