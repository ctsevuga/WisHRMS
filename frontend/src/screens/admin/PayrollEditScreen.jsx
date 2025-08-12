import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetPayrollDetailsQuery,
  useUpdatePayrollMutation,
} from "../../slices/payrollApiSlice";

const PayrollEditScreen = () => {
  const { id: payrollId } = useParams();
  const [payroll, setPayroll] = useState();

  const {
    data,
    refetch,
  } = useGetPayrollDetailsQuery(payrollId ?? skipToken);

  useEffect(() => {
    if (payrollId) {
      refetch();
    }
  }, [payrollId, refetch]);

  useEffect(() => {
    if (data) {
      setPayroll(data);
    }
  }, [data]);

  const [updatePayroll, { isLoading: loadingUpdate }] =
    useUpdatePayrollMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updatePayroll(payrollId);
      refetch();
      toast.success("Payment Date Updated");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to="/admin/payrolllist" className="btn btn-light my-3">
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
            <Col md={6}>
              <p><strong>Year:</strong> {payroll?.year}</p>
              <p><strong>Month:</strong> {payroll?.month}</p>
              <p><strong>Total Working Days:</strong> {payroll?.workingDays}</p>
              <p><strong>Paid Days:</strong> {payroll?.paidDays}</p>
            </Col>

            <Col md={6}>
              <p><strong>Gross Salary:</strong> {payroll?.grossSalary}</p>
              <p><strong>Net Salary:</strong> {payroll?.netSalary}</p>
              <p><strong>Total Deduction:</strong> {payroll?.totalDeductions}</p>
              <p><strong>Net Pay:</strong> {payroll?.netPay}</p>
              <p><strong>PF Employer Contribution:</strong> {payroll?.PFEmployerContribution}</p>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={6}>
              <p><strong>Payment Status:</strong> {payroll?.paymentStatus}</p>
              <p><strong>Generated On:</strong> {payroll?.generatedOn}</p>
              <p><strong>Payment Date:</strong> {payroll?.paymentDate}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {payroll?.paymentStatus !== "Paid" && (
        <div className="container mt-4">
          <h2 className="mb-3">Payment Made?</h2>
          <Form onSubmit={submitHandler}>
            <Button type="submit" className="btn btn-primary">
              Update Payment Date
            </Button>
          </Form>
        </div>
      )}
    </>
  );
};

export default PayrollEditScreen;
