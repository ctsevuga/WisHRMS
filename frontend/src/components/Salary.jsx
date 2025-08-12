import { Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Salary = ({ salary }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/admin/employees`} className="btn btn-light mb-3">
        Go Back
      </Link>

      <Card.Body>
        <Card.Title as="div" className="product-title mb-3">
          <strong>Employee ID:</strong> {salary.empId}
        </Card.Title>

        <Card.Title as="div" className="product-title mb-4">
          <strong>Name:</strong> {salary.name}
        </Card.Title>

        <Row className="mb-3">
          <Col md={4}>
            <p><strong>Basic:</strong> {salary.basic}</p>
          </Col>
          <Col md={4}>
            <p><strong>HRA:</strong> {salary.hra}</p>
          </Col>
          <Col md={4}>
            <p><strong>Conveyance:</strong> {salary.conveyance}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <p><strong>Other Allowances:</strong> {salary.otherAllowances}</p>
          </Col>
          <Col md={4}>
            <p><strong>PF:</strong> {salary.pf}</p>
          </Col>
          <Col md={4}>
            <p><strong>ESI:</strong> {salary.esi}</p>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <p><strong>Tax:</strong> {salary.tax}</p>
          </Col>
          <Col md={4}>
            <p><strong>Effective From:</strong> {salary.effectiveFrom}</p>
          </Col>
          <Col md={4}>
            <p><strong>Effective To:</strong> {salary.effectiveTo}</p>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={6}>
            <h5><strong>Gross Salary:</strong> {salary.grossSalary}</h5>
          </Col>
          <Col md={6}>
            <h5><strong>Net Salary:</strong> {salary.netSalary}</h5>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default Salary;
