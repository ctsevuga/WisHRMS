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

const OutputDetailsScreen = () => {
  const { id } = useParams();
  const [output, setOutput] = useState(null);

  const {
    data: fetchedOutput,
    refetch,
    isLoading,
    error,
  } = useGetOutputQuery(id);

  useEffect(() => {
    if (fetchedOutput) {
      setOutput(fetchedOutput);
    }
  }, [fetchedOutput]);

  if (error)
    return (
      <Container className="mt-4">
        <Alert variant="danger">
          {error?.data?.message || error.message || "Something went wrong."}
        </Alert>
      </Container>
    );

  if (isLoading || !output)
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading output details...</p>
      </Container>
    );

  const input = output.input;

  return (
    <Container className="mt-4">
      <h3 className="text-center mb-4 text-primary">
        Output Details (Heat No: {input?.heatNo || "N/A"})
      </h3>

      <Row>
        {/* Output Summary */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-success text-white">
              Output Summary
            </Card.Header>
            <Card.Body>
              <p><strong>Details:</strong> {output.details || "N/A"}</p>
              <p><strong>Output FG:</strong> {output.outputFG} Kg</p>
              <p><strong>Total Output:</strong> {output.totalOutput} Kg</p>
              <p><strong>Dross:</strong> {output.dross} Kg ({output.drossInPerc?.toFixed(2)}%)</p>
              <p><strong>Iron:</strong> {output.iron} Kg ({output.ironInPerc?.toFixed(2)}%)</p>
              <p><strong>Actual Recovery:</strong> {output.actualRecovery?.toFixed(2)}%</p>
              <p><strong>Actual Cost/Kg:</strong> ₹{output.actualCostPerKg?.toFixed(2)}</p>
              <p><strong>Overall Cost/Kg:</strong> ₹{output.overallCostPerKg?.toFixed(2)}</p>
              <p><strong>Created At:</strong> {new Date(output.createdAt).toLocaleDateString()}</p>
              <p><strong>Created By:</strong> {output.createdBy?.name || "N/A"}</p>
            </Card.Body>
          </Card>
        </Col>

        {/* Input Summary */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm h-100">
            <Card.Header className="bg-secondary text-white">
              Input Summary
            </Card.Header>
            <Card.Body>
              <p><strong>Heat No:</strong> {input?.heatNo}</p>
              <p><strong>Date:</strong> {new Date(input?.date).toLocaleDateString()}</p>
              <p><strong>Details:</strong> {input?.details || "N/A"}</p>
              <p><strong>Created By:</strong> {input?.createdBy?.name || "N/A"}</p>
              <p><strong>Total Material (Kg):</strong> {input?.totalMaterialInKg}</p>
              <p><strong>Total Material Cost:</strong> ₹{input?.totalMaterialCost?.toFixed(2)}</p>
              <p><strong>Cost per Kg:</strong> ₹{input?.materialkgPerCost?.toFixed(2)}</p>
              <p><strong>Overall Cost:</strong> ₹{input?.overallCost?.toFixed(2)}</p>
              <p><strong>Overall Cost/Kg:</strong> ₹{input?.overallmaterialkgPerCost?.toFixed(2)}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Materials Table */}
      {input?.materials?.length > 0 && (
        <Card className="shadow-sm mb-4">
          <Card.Header className="bg-dark text-white">Input Materials</Card.Header>
          <Card.Body className="p-0">
            <div className="table-responsive">
              <Table striped bordered hover responsive className="mb-0">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Product</th>
                    <th>Quantity (Kg)</th>
                    <th>Cost (₹)</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {input.materials.map((mat, idx) => (
                    <tr key={idx}>
                      <td>{mat.Product?.Product || "N/A"}</td>
                      <td>{mat.qtyInKg}</td>
                      <td>₹{mat.cost?.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Card.Body>
        </Card>
      )}

      {/* Cost Breakdown */}
      <Row>
        {/* Labour & Utility Costs */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              Labour & Utility Costs
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Workers' Salary:</strong> ₹{input?.workersSalary}</ListGroup.Item>
              <ListGroup.Item><strong>Middle Management Salary:</strong> ₹{input?.middleManagementSalary}</ListGroup.Item>
              <ListGroup.Item><strong>Top Management Salary:</strong> ₹{input?.topManagementSalary}</ListGroup.Item>
              <ListGroup.Item><strong>Food Cost:</strong> ₹{input?.foodCost}</ListGroup.Item>
              <ListGroup.Item><strong>Fuel (Forklift):</strong> ₹{input?.fuelForkLiftCost}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>

        {/* Operational Costs */}
        <Col md={6} className="mb-4">
          <Card className="shadow-sm">
            <Card.Header className="bg-info text-white">
              Operational Costs
            </Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Gas Cost:</strong> ₹{input?.gasCost}</ListGroup.Item>
              <ListGroup.Item><strong>Water Cost:</strong> ₹{input?.waterCost}</ListGroup.Item>
              <ListGroup.Item><strong>Electricity Cost:</strong> ₹{input?.electricityCost}</ListGroup.Item>
              <ListGroup.Item><strong>Maintenance Cost:</strong> ₹{input?.maintenanceCost}</ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OutputDetailsScreen;
