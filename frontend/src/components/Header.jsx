import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import logo from "../assets/logo.png";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="d-flex align-items-center">
              <img
                src={logo}
                alt="AMG"
                height="40"
                width="40"
                className="d-inline-block align-top me-2"
                style={{
                  borderRadius: "8px",
                  objectFit: "contain",
                  backgroundColor: "white",
                  padding: "4px",
                }}
              />
              <span
                className="fw-bold text-light"
                style={{ letterSpacing: "1px", fontSize: "1.2rem" }}
              >
                Andavar Metal
              </span>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/productList">
                      <NavDropdown.Item>Product List</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/inactiveProductList">
                      <NavDropdown.Item>In Active Product List</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/input">
                      <NavDropdown.Item>Input</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/output">
                      <NavDropdown.Item>Create Output</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/inputList">
                      <NavDropdown.Item>Input List</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/OutputList">
                      <NavDropdown.Item>Output List</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link className="d-flex align-items-center">
                    <FaUser className="me-1" /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Inline styling for mobile responsiveness */}
      <style jsx>{`
        @media (max-width: 576px) {
          .navbar-brand img {
            height: 32px !important;
            width: 32px !important;
          }
          .navbar-brand span {
            font-size: 1rem !important;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
