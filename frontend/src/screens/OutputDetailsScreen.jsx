import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetOutputQuery } from "../slices/outputApiSlice";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Table,
  ListGroup,
} from "react-bootstrap";
import {
  FaFire,
  FaTools,
  FaMoneyBillWave,
  FaUserTie,
  FaCalendarAlt,
  FaCogs,
  FaGasPump,
} from "react-icons/fa";
import { GiFurnace, GiMetalBar } from "react-icons/gi";
import { MdOutlineWaterDrop, MdOutlineFoodBank } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";

const OutputDetailsScreen = () => {
  const { id } = useParams();
  const [output, setOutput] = useState(null);

  const { data: fetchedOutput, isLoading, error } = useGetOutputQuery(id);

  useEffect(() => {
    if (fetchedOutput) setOutput(fetchedOutput);
  }, [fetchedOutput]);

  if (isLoading)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading output details...</p>
      </Container>
    );

  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="text-center">
          ⚠️ {error?.data?.message || error.message || "Something went wrong."}
        </Alert>
      </Container>
    );

  if (!output)
    return (
      <Container className="mt-4">
        <Alert variant="warning" className="text-center">
          No output found.
        </Alert>
      </Container>
    );

  const input = output.input;

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary">
          <GiFurnace className="me-2 text-danger" />
          Furnace Output Details
        </h2>
        <p className="text-muted">
          Summary of the production process and performance metrics
        </p>
      </div>

      {/* Output & Input Summaries */}
      <Row className="gy-4">
        {/* Output Summary */}
        <Col xs={12} md={6}>
          <Card className="shadow-lg border-0 h-100 rounded-3">
            <Card.Header className="bg-success text-white fw-bold">
              <GiMetalBar className="me-2" />
              Output Summary
            </Card.Header>
            <Card.Body>
              <p>
                <strong>Details:</strong> {output.details || "N/A"}
              </p>
              <Row>
                <Col xs={6}>
                  <p>
                    <strong>Output FG:</strong> {output.outputFG || 0} Kg
                  </p>
                  <p>
                    <strong>Total Output:</strong> {output.totalOutput || 0} Kg
                  </p>
                  <p>
                    <strong>Dross:</strong> {output.dross || 0} Kg (
                    {output.drossInPerc?.toFixed(2) || 0}%)
                  </p>
                  <p>
                    <strong>Iron:</strong> {output.iron || 0} Kg (
                    {output.ironInPerc?.toFixed(2) || 0}%)
                  </p>
                </Col>
                <Col xs={6}>
                  <p>
                    <strong>Actual Recovery:</strong>{" "}
                    {output.actualRecovery?.toFixed(2) || 0}%
                  </p>
                  <p>
                    <strong>Actual Cost/Kg:</strong> ₹
                    {output.actualCostPerKg?.toFixed(2) || 0}
                  </p>
                  <p>
                    <strong>Overall Cost/Kg:</strong> ₹
                    {output.overallCostPerKg?.toFixed(2) || 0}
                  </p>
                </Col>
              </Row>
              <hr />
              <p className="mb-1">
                <FaCalendarAlt className="me-2 text-info" />
                <strong>Created At:</strong>{" "}
                {new Date(output.createdAt).toLocaleDateString()}
              </p>
              <p>
                <FaUserTie className="me-2 text-warning" />
                <strong>Created By:</strong> {output.createdBy?.name || "N/A"}
              </p>
            </Card.Body>
          </Card>
        </Col>

        {/* Input Summary */}
        <Col xs={12} md={6}>
          <Card className="shadow-lg border-0 h-100">
            <Card.Header className="bg-secondary text-white fw-bold">
              <FaTools className="me-2" />
              Input Summary
            </Card.Header>
            <Card.Body>
              <p>
                <FaFire className="me-2 text-danger" />
                <strong>Heat No:</strong> {input?.heatNo || "N/A"}
              </p>
              <p>
                <FaCalendarAlt className="me-2 text-info" />
                <strong>Date:</strong>{" "}
                {input?.date
                  ? new Date(input.date).toLocaleDateString()
                  : "N/A"}
              </p>
              <p>
                <strong>Details:</strong> {input?.details || "N/A"}
              </p>
              <p>
                <FaUserTie className="me-2 text-success" />
                <strong>Created By:</strong> {input?.createdBy?.name || "N/A"}
              </p>
              <hr />
              <p>
                <strong>Total Material (Kg):</strong>{" "}
                {input?.totalMaterialInKg || 0}
              </p>
              <p>
                <strong>Total Material Cost:</strong> ₹
                {input?.totalMaterialCost?.toFixed(2) || 0}
              </p>
              <p>
                <strong>Cost per Kg:</strong> ₹
                {input?.materialkgPerCost?.toFixed(2) || 0}
              </p>
              <p>
                <strong>Overall Cost:</strong> ₹
                {input?.overallCost?.toFixed(2) || 0}
              </p>
              <p>
                <strong>Overall Cost/Kg:</strong> ₹
                {input?.overallmaterialkgPerCost?.toFixed(2) || 0}
              </p>

              {/* ✅ Newly Added Fields */}
              {/* <p>
                <strong>Conversion Cost:</strong> ₹
                {input?.conversionCost?.toFixed(2) || 0}
              </p> */}
              <p>
                <strong>Cost with Conversion/Kg:</strong> ₹
                {input?.costWithConversionKgPerCost?.toFixed(2) || 0}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Materials Table */}
      {input?.materials?.length > 0 && (
        <Card className="shadow-lg border-0 mt-4">
          <Card.Header className="bg-dark text-white fw-bold">
            <FaCogs className="me-2" />
            Input Materials
          </Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table
                striped
                bordered
                hover
                responsive
                className="mb-0 text-center align-middle"
              >
                <thead className="table-primary">
                  <tr>
                    <th>Product</th>
                    <th>Quantity (Kg)</th>
                    <th>Cost (₹)</th>
                  </tr>
                </thead>
                <tbody>
                  {input.materials.map((mat, idx) => (
                    <tr key={idx}>
                      <td>{mat.Product?.Product || "N/A"}</td>
                      <td>{mat.qtyInKg || 0}</td>
                      <td>₹{mat.cost?.toFixed(2) || 0}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Cost Breakdown */}
      <Row className="mt-4 gy-4">
        {/* Labour & Utility Costs */}
        <Col xs={12} md={6}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-info text-white fw-bold">
              <FaMoneyBillWave className="me-2" />
              Labour & Utility Costs
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                👷 Workers' Salary: ₹{input?.workersSalary || 0}
              </ListGroup.Item>
              <ListGroup.Item>
                👔 Middle Management: ₹{input?.middleManagementSalary || 0}
              </ListGroup.Item>
              <ListGroup.Item>
                🧑‍💼 Top Management: ₹{input?.topManagementSalary || 0}
              </ListGroup.Item>
              <ListGroup.Item>
                <MdOutlineFoodBank className="me-2 text-success" />
                Food Cost: ₹{input?.foodCost || 0}
              </ListGroup.Item>
              <ListGroup.Item>
                ⛽ Forklift Fuel: ₹{input?.fuelForkLiftCost || 0}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Operational Costs */}
        <Col xs={12} md={6}>
          <Card className="shadow-lg border-0">
            <Card.Header className="bg-warning text-dark fw-bold">
              <FaGasPump className="me-2" />
              Operational Costs
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <FaGasPump className="me-2 text-danger" />
                Gas Cost: ₹{input?.gasCost || 0}
              </ListGroup.Item>
              <ListGroup.Item>
                <MdOutlineWaterDrop className="me-2 text-primary" />
                Water Cost: ₹{input?.waterCost || 0}
              </ListGroup.Item>
              <ListGroup.Item>
                <BsLightningChargeFill className="me-2 text-warning" />
                Electricity Cost: ₹{input?.electricityCost || 0}
              </ListGroup.Item>
              <ListGroup.Item>
                🛠 Maintenance Cost: ₹{input?.maintenanceCost || 0}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
        <Col xs={6}>
          <p>
            <strong>Actual Recovery:</strong>{" "}
            {output.actualRecovery?.toFixed(2) || 0}%
          </p>
          <p>
            <strong>Actual Cost/Kg:</strong> ₹
            {output.actualCostPerKg?.toFixed(2) || 0}
          </p>
          <p>
            <strong>Overall Cost/Kg:</strong> ₹
            {output.overallCostPerKg?.toFixed(2) || 0}
          </p>
          <p>
            <strong>Cost with Conversion/Kg:</strong> ₹
            {output.costWithConversionPerKg?.toFixed(2) || 0}
          </p>
        </Col>
      </Row>

      <style jsx>{`
        @media (max-width: 768px) {
          h2 {
            font-size: 1.4rem;
          }
          .card-header {
            font-size: 0.9rem;
          }
          .table {
            font-size: 0.85rem;
          }
          p {
            margin-bottom: 0.5rem;
          }
        }
      `}</style>
    </Container>
  );
};

export default OutputDetailsScreen;
