import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetPayrollViewQuery } from "../slices/payrollApiSlice";

const PayslipScreen = () => {
  const { id: payrollId } = useParams();
  const [payroll, setPayroll] = useState();

  const { data, refetch } = useGetPayrollViewQuery(payrollId ?? skipToken);

  useEffect(() => {
    if (payrollId) {
      refetch(); // force refetch when ID changes
    }
  }, [payrollId, refetch]);

  useEffect(() => {
    if (data) {
      setPayroll(data);
    }
  }, [data]);

  return (
    <>
      <Link to="/payslips" className="btn btn-light my-3">
        Go Back
      </Link>

      <h1>Payroll Details for {payroll?.name}</h1>

      <Card className="my-3 p-3 rounded">
        <Card.Body>
          <Card.Title as="div" className="product-title mb-3">
            <strong>Employee ID:</strong> {payroll?.empId}
          </Card.Title>
          <Card.Title as="div" className="product-title mb-3">
            <strong>Name:</strong> {payroll?.name}
          </Card.Title>

          <Row>
            <Col md={4}>
              <p><strong>Year:</strong> {payroll?.year}</p>
              <p><strong>Month:</strong> {payroll?.month}</p>
              <p><strong>Generated On:</strong> {payroll?.generatedOn}</p>
              <p><strong>Payment Date:</strong> {payroll?.paymentDate}</p>
            </Col>

            <Col md={4}>
              <p><strong>Total Working Days:</strong> {payroll?.workingDays}</p>
              <p><strong>Paid Days:</strong> {payroll?.paidDays}</p>
              <p><strong>Total Deduction:</strong> {payroll?.totalDeductions}</p>
              <p><strong>PF Employer Contribution:</strong> {payroll?.PFEmployerContribution?.toFixed(2) || "0.00"}</p>
            </Col>

            <Col md={4}>
              <p><strong>Gross Salary:</strong> {payroll?.grossSalary}</p>
              <p><strong>Net Salary:</strong> {payroll?.netSalary}</p>
              <p><strong>Net Pay:</strong> {payroll?.netPay}</p>
              <p><strong>Payment Status:</strong> {payroll?.paymentStatus}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default PayslipScreen;
