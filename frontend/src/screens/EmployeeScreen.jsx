import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  useGetEmployeeQuery,
  useCreateEmployeeMutation,
} from "../slices/employeesApiSlice";

import { setCredentials } from "../slices/authSlice";

const EmployeeScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empId, setEmpId] = useState(userInfo.empId);
  const [user, setUser] = useState();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [bankName, setBankName] = useState("");
  const [isActive, setIsActive] = useState();

  const {
    data: employee,
    refetch,
    isLoading,
    error,
  } = useGetEmployeeQuery(empId);

  useEffect(() => {
    console.log(employee);
    if (employee) {
      setUser(employee._id);
      setName(employee.name);
      setGender(employee.gender);
      setDob(new Date(employee.dob).toISOString().split("T")[0]);
      setJoiningDate(
        new Date(employee.joiningDate).toISOString().split("T")[0]
      );
      setDepartment(employee.department);
      setDesignation(employee.designation);
      setContact(employee.contact);
      setAddress(employee.address);
      setAccountNumber(employee.accountNumber);
      setIfscCode(employee.ifscCode);
      setBankName(employee.bankName);
      setIsActive(true);
    }
  }, [employee]);

  const [createEmployee, { isLoading: loadingUpdateProfile }] =
    useCreateEmployeeMutation();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await createEmployee({
        user,
        empId,
        name,
        gender,
        dob,
        joiningDate,
        department,
        designation,
        contact,
        address,
        accountNumber,
        ifscCode,
        bankName,
        isActive,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Employee created / updated successfully");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>User Profile</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="gender">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="dob">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="joiningDate">
              <Form.Label>JoiningDate</Form.Label>
              <Form.Control
                type="date"
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="department">
              <Form.Label>Department</Form.Label>
              <Form.Control
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="designation">
              <Form.Label>Designation</Form.Label>
              <Form.Control
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="contact">
              <Form.Label>Contact</Form.Label>
              <Form.Control
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="accountNumber">
              <Form.Label>Account Number</Form.Label>
              <Form.Control
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="ifscCode">
              <Form.Label>IFSC Code</Form.Label>
              <Form.Control
                type="text"
                value={ifscCode}
                onChange={(e) => setIfscCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="bankName">
              <Form.Label>Bank Name</Form.Label>
              <Form.Control
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Submit
            </Button>
            {loadingUpdateProfile && <Loader />}
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default EmployeeScreen;
