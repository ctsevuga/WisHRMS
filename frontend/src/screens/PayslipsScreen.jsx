import React, { useState } from "react";
import {  Table,Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import Message from '../components/Message';
import Loader from '../components/Loader';
import {  FaInfo } from "react-icons/fa";
import { useGetMyPayslipsQuery } from "../slices/payrollApiSlice";
import { LinkContainer } from "react-router-bootstrap";

const PayslipsScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [empId, setEmpId] = useState(userInfo.empId);

  const { data: payrolls, isLoading, error } = useGetMyPayslipsQuery(empId);
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const day = String(date.getDate()).padStart(2, "0"); // e.g. 12
    const month = String(date.getMonth() + 1).padStart(2, "0"); // e.g. 06
    const year = date.getFullYear(); // e.g. 2025

    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <h1>Payslip List</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>NAME</th>
              <th>Year</th>
              <th>Month</th>
              <th>Net Pay</th>
              <th>Generated On</th>
              <th>Payment Date</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((payroll) => (
              <tr key={payroll._id}>
                <td>{payroll.empId}</td>
                <td>{payroll.name}</td>
                <td>{payroll.year}</td>
                <td>{payroll.month}</td>
                <td>{payroll.netPay}</td>
                <td>{formatDate(payroll.generatedOn)}</td>
                <td>{formatDate(payroll.paymentDate)}</td>
                <td>
                   <>
                    <LinkContainer
                      to={`/payroll/${payroll._id}/view`}
                      style={{ marginRight: "10px" }}
                    >
                      <Button variant="light" className="btn-sm">
                        <FaInfo />
                      </Button>
                    </LinkContainer>
                   </>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default PayslipsScreen;
