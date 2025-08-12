import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";

import logo from "../assets/logo.png";

const Header = () => {
  // const { cartItems } = useSelector((state) => state.cart);
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
            <Navbar.Brand>
              <img src={logo} alt="ACGCET" />
              ACGCET
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg="success" style={{ marginLeft: "5px" }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer> */}
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/leave">
                      <NavDropdown.Item>Apply Leave</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/mine">
                      <NavDropdown.Item>My Attendances</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/leave/mine">
                      <NavDropdown.Item>My Leaves</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/attendance">
                      <NavDropdown.Item>
                        Enter Previous Day Attendences
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/salary">
                      <NavDropdown.Item>Salary Details</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/payslips">
                      <NavDropdown.Item>Payslips</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser /> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin Links */}
              {userInfo && userInfo.role === "admin" && (
                <NavDropdown title="Admin" id="adminmenu">
                  {/* <LinkContainer to="/admin/productlist">
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/orderlist">
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer> */}
                  <LinkContainer to="/admin/userlist">
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/today">
                    <NavDropdown.Item>Today Attendance</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/parameterlist">
                    <NavDropdown.Item>Parameters</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Attendance Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/holiday">
                    <NavDropdown.Item>Holiday</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/leavelist">
                    <NavDropdown.Item>Leave List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/allocate">
                    <NavDropdown.Item>Allocate Leaves</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/employees">
                    <NavDropdown.Item>Employees</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/salaries">
                    <NavDropdown.Item>Create Salaries</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/payroll">
                    <NavDropdown.Item>Generate Payroll</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/payment">
                    <NavDropdown.Item>Payroll Payment</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/salarylist">
                    <NavDropdown.Item>Salary List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/payrolllist">
                    <NavDropdown.Item>Payroll List</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/admin/configurations">
                    <NavDropdown.Item>Configurations View</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
