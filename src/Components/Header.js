import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <>
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand href="/">
            <img
              src={logoApp}
              className="d-inline-blick- align-top"
              alt="React Bootstrap Logo"
              width="30"
              height="30"
            ></img>
            <span> </span>
            QLER JSC
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/users">
                User Manage
              </NavLink>
            </Nav>
            <Nav>
              <NavDropdown title="Setting" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Login</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}

export default Header;
