import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Payroll = ({ payroll }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/admin/payrolllist`}>Go Back</Link>

      <Card.Body>
        <Card.Title as="div" className="product-title">
          <strong>Employee ID: {payroll.empId}</strong>
        </Card.Title>
        <Card.Title as="div" className="product-title">
          <strong>Name: {payroll.name}</strong>
        </Card.Title>

        <Card.Text as="div">
          <p>Year: {payroll.year}</p>
          <p>Month: {payroll.month}</p>
          <p>Total Working Days: {payroll.workingDays}</p>
          <p>Paid Days: {payroll.paidDays}</p>
          <p>Gross Salary: {payroll.grossSalary}</p>
          <p>Net Salary: {payroll.netSalary}</p>
          <p>Total Deduction: {payroll.totalDeductions}</p>
          <h5>Net Pay: {payroll.netPay}</h5>
          <h5>Payment Status: {payroll.paymentStatus}</h5>
          <p>Generated On: {payroll.generatedOn}</p>
          <p>Payment Date: {payroll.paymentDate}</p>
        </Card.Text>

        {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default Payroll;
