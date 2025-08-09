import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Row, Col, Card } from "react-bootstrap";

import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetPayrollViewQuery } from "../slices/payrollApiSlice";

const PayslipScreen = () => {
  const { id: payrollId } = useParams();
  const [payroll, setPayroll] = useState();

  const {
    data,

    refetch,
  } = useGetPayrollViewQuery(payrollId ?? skipToken);
  console.log(data);
  useEffect(() => {
    if (payrollId) {
      refetch(); // force refetch when ID changes
    }
  }, [payrollId, refetch]);
  useEffect(() => {
    if (data) {
      setPayroll(data);
    }
  }, [data, refetch]);

  return (
    <>
      <Link to="/payslips" className="btn btn-light my-3">
        Go Back
      </Link>

      <h1>Payroll Details for {payroll?.name}</h1>

      <Card className="my-3 p-3 rounded">
        <Card.Body>
          <Card.Title as="div" className="product-title">
            <strong>Employee ID: {payroll?.empId}</strong>
          </Card.Title>
          <Card.Title as="div" className="product-title">
            <strong>Name: {payroll?.name}</strong>
          </Card.Title>
          <Row>
            <Card.Text as="div">
              <Col md={6}>
                <p>Year: {payroll?.year}</p>
                <p>Month: {payroll?.month}</p>
                <p>Total Working Days: {payroll?.workingDays}</p>
                <p>Paid Days: {payroll?.paidDays}</p>
                <p>Gross Salary: {payroll?.grossSalary}</p>
              </Col>
              <Col md={6}>
                <p>Net Salary: {payroll?.netSalary}</p>
                <p>Total Deduction: {payroll?.totalDeductions}</p>
                <h5>Net Pay: {payroll?.netPay}</h5>
                <h5>Payment Status: {payroll?.paymentStatus}</h5>
                <p>Generated On: {payroll?.generatedOn}</p>
                <p>Payment Date: {payroll?.paymentDate}</p>
              </Col>
            </Card.Text>
          </Row>
          {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
        </Card.Body>
      </Card>
    </>
  );
};

export default PayslipScreen;
