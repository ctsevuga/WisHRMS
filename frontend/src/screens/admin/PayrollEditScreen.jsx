import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import Payroll from "../../components/Payroll";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import FormContainer from "../../components/FormContainer";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { skipToken } from "@reduxjs/toolkit/query";
import {
  useGetPayrollDetailsQuery,
  useUpdatePayrollMutation,
} from "../../slices/payrollApiSlice";

const PayrollEditScreen = () => {
  const { id: payrollId } = useParams();
  const [payroll, setPayroll] = useState();
  console.log(payrollId);
  const {
    data,

    refetch,
  } = useGetPayrollDetailsQuery(payrollId ?? skipToken);
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
  const [updatePayroll, { isLoading: loadingUpdate }] =
    useUpdatePayrollMutation();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updatePayroll(payrollId);
      refetch();
      toast.success("Payment Date Updated ");
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
      {/* <Row>
        <Col key={payroll?._id}>
          <Payroll payroll={payroll} />
        </Col>
      </Row> */}
      <Card className="my-3 p-3 rounded">
        <Card.Body>
          <Card.Title as="div" className="product-title">
            <strong>Employee ID: {payroll?.empId}</strong>
          </Card.Title>
          <Card.Title as="div" className="product-title">
            <strong>Name: {payroll?.name}</strong>
          </Card.Title>

          <Card.Text as="div">
            <p>Year: {payroll?.year}</p>
            <p>Month: {payroll?.month}</p>
            <p>Total Working Days: {payroll?.workingDays}</p>
            <p>Paid Days: {payroll?.paidDays}</p>
            <p>Gross Salary: {payroll?.grossSalary}</p>
            <p>Net Salary: {payroll?.netSalary}</p>
            <p>Total Deduction: {payroll?.totalDeductions}</p>
            <h5>Net Pay: {payroll?.netPay}</h5>
            <h5>Payment Status: {payroll?.paymentStatus}</h5>
            <p>Generated On: {payroll?.generatedOn}</p>
            <p>Payment Date: {payroll?.paymentDate}</p>
          </Card.Text>

          {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
        </Card.Body>
      </Card>
      
      {/* <div className="container mt-4">
        <h2 className="mb-4">Payment Made?</h2>
        <form onSubmit={submitHandler}>
          
          <button type="submit" className="btn btn-primary">
            Update Payment Date
          </button>
          
        </form>
      </div> */}

      {payroll?.paymentStatus != "Paid" ? (
  <div className="container mt-4">
    <h2 className="mb-4">Payment Made?</h2>
    <form onSubmit={submitHandler}>
      <button type="submit" className="btn btn-primary">
        Update Payment Date
      </button>
    </form>
  </div>
) : null}

       
    </>
      );
};

export default PayrollEditScreen;
