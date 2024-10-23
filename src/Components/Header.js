import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logoApp from "../assets/images/logo192.png";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/loginSlice";

function Header() {
  const isLogin = useSelector((state) => state.login.isLogin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <>
      <Container>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Navbar.Brand>
            <NavLink className="nav-link" to="/home">
              <img
                src={logoApp}
                className="d-inline-blick- align-top"
                alt="React Bootstrap Logo"
                width="30"
                height="30"
              ></img>
              <span> </span>
              QLER JSC
            </NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            { isLogin &&
            <>
              <Nav className="me-auto">
                <NavLink className="nav-link" to="/home">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/users">
                  User Manage
                </NavLink>
              </Nav>
              <Nav>
                <NavDropdown title="Setting" id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <NavLink
                      className="nav-link"
                      to="/login"
                      onClick={handleLogout}
                    >
                      Logout
                    </NavLink>
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </>
            }
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  );
}

export default Header;
