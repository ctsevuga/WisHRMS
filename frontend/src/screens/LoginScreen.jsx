import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Image, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FaLock, FaMobileAlt, FaUserPlus, FaSignInAlt } from "react-icons/fa";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import furnaceImage from "../assets/furnace.png"; // Add your furnace image here

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const navigateToRegistration = () => navigate("/register");

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ phone, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/input");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Container fluid className="login-screen-container py-5 px-3">
      <Row className="align-items-center justify-content-center">
        {/* Left - Login Form */}
        <Col xs={12} md={6} className="mb-5 mb-md-0">
          <Card className="p-4 shadow-lg border-0 rounded-4 bg-light bg-gradient">
            <h2 className="text-center mb-4 text-primary fw-bold">
              <FaSignInAlt className="me-2" />
              Furnace Control Login
            </h2>

            <Form onSubmit={submitHandler}>
              <Form.Group className="my-3" controlId="phoneNumber">
                <Form.Label className="fw-semibold">
                  <FaMobileAlt className="me-2 text-success" />
                  Mobile Phone
                </Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="py-2"
                  required
                />
              </Form.Group>

              <Form.Group className="my-3" controlId="password">
                <Form.Label className="fw-semibold">
                  <FaLock className="me-2 text-danger" />
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="py-2"
                  required
                />
              </Form.Group>

              <Button
                disabled={isLoading}
                type="submit"
                variant="primary"
                className="w-100 py-2 fw-bold rounded-3"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,140,0,1) 0%, rgba(255,85,0,1) 100%)",
                  border: "none",
                }}
              >
                Sign In
              </Button>

              {isLoading && <Loader />}
            </Form>

            <Row className="py-3">
              <Col className="text-center">
                New to the system?{" "}
                <Button
                  variant="outline-secondary"
                  type="button"
                  onClick={navigateToRegistration}
                  className="fw-semibold mt-2"
                >
                  <FaUserPlus className="me-2" />
                  Register Here
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Right - Furnace Image & Info */}
        <Col
          xs={12}
          md={6}
          className="text-light d-flex flex-column justify-content-center align-items-center text-center rounded-4 p-4 furnace-info-section"
        >
          <Image
            src={furnaceImage}
            alt="Furnace operation"
            fluid
            rounded
            className="mb-4 shadow furnace-image"
            style={{ maxHeight: "250px", objectFit: "cover" }}
          />
          <h3 className="text-warning fw-bold mb-3">Advanced Furnace Operations</h3>
          <p className="px-3">
            Our smart furnace system is designed to melt various metals like steel, copper, and
            aluminum with precision temperature control and efficiency tracking.
          </p>
          <p className="px-3">
            Operators can log in to record input materials, monitor real-time parameters, and
            analyze output composition. Ensuring accuracy, safety, and energy-efficient industrial
            operations.
          </p>
        </Col>
      </Row>

      {/* Inline Styles for visual polish */}
      <style jsx>{`
        .login-screen-container {
          background: linear-gradient(120deg, #0a0a0a, #2b2b2b, #111);
          min-height: 100vh;
        }

        .furnace-info-section {
          background: radial-gradient(circle at center, #202020 0%, #000 100%);
        }

        .furnace-image {
          animation: pulse 3s infinite ease-in-out;
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 150, 50, 0.5);
          }
          50% {
            transform: scale(1.03);
            box-shadow: 0 0 20px rgba(255, 180, 80, 0.7);
          }
          100% {
            transform: scale(1);
            box-shadow: 0 0 10px rgba(255, 150, 50, 0.5);
          }
        }

        @media (max-width: 767px) {
          .login-screen-container {
            padding: 2rem 1rem;
          }
          .furnace-info-section {
            margin-top: 2rem;
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default LoginScreen;
