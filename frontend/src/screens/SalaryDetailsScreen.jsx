import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import Salary from "../components/Salary";
import { useGetMySalaryQuery } from "../slices/salaryApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const SalaryDetailsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empId, setEmpId] = useState(userInfo.empId);
console.log(empId);
  const { data: salary,isLoading,error } = useGetMySalaryQuery(empId);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          
          <h1>Salary Details for {salary.name}</h1>
          <Row>
            <Col key={salary._id}>
              <Salary salary={salary} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default SalaryDetailsScreen;
