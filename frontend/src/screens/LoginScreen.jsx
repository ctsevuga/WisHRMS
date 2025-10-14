import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const navigateToRegistration = () => {
    navigate("/register");
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ phone, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.log(res.empId);

      // navigate(`/employee/${res.empId}`);
      navigate("/input");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="phoneNumber">
          <Form.Label>Mobile Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            pattern="^\d{10}$"
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button disabled={isLoading} type="submit" variant="primary">
          Sign In
        </Button>

        {isLoading && <Loader />}
      </Form>

      <Row className="py-3">
        <Col>
          New Customer?{" "}
          <Button
            className="btn-block"
            type="button"
            onClick={navigateToRegistration}
          >
            Registration
          </Button>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
