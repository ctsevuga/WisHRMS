import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Salary = ({ salary }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/admin/employees`}>Go Back</Link>

      <Card.Body>
        <Card.Title as="div" className="product-title">
          <strong>Employee ID: {salary.empId}</strong>
        </Card.Title>
        <Card.Title as="div" className="product-title">
          <strong>Name: {salary.name}</strong>
        </Card.Title>

        <Card.Text as="div">
          <p>Basic: {salary.basic}</p>
          <p>HRA: {salary.hra}</p>
          <p>Conveyance: {salary.conveyance}</p>
          <p>Other Allowances: {salary.otherAllowances}</p>
          <p>PF: {salary.pf}</p>
          <p>ESI: {salary.esi}</p>
          <p>Tax: {salary.tax}</p>
          <h5>Gross Salary: {salary.grossSalary}</h5>
          <h5>Net Salary: {salary.netSalary}</h5>
          <p>Effective From: {salary.effectiveFrom}</p>
          <p>Effective To: {salary.effectiveTo}</p>
        </Card.Text>

        {/* <Card.Text as='h3'>${product.price}</Card.Text> */}
      </Card.Body>
    </Card>
  );
};

export default Salary;
