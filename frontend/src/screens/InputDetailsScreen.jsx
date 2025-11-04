import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetInputQuery } from "../slices/inputApiSlice";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Table,
  Badge,
} from "react-bootstrap";
import {
  FaFire,
  FaCalendarAlt,
  FaUserTie,
  FaCogs,
  FaMoneyBillWave,
  FaTools,
  FaInfoCircle,
  FaGasPump,
} from "react-icons/fa";
import { GiFurnace } from "react-icons/gi";
import { MdOutlineWaterDrop, MdOutlineFoodBank } from "react-icons/md";
import { BsLightningChargeFill } from "react-icons/bs";

const InputDetailsScreen = () => {
  const { id } = useParams();
  const [input, setInput] = useState(null);
  const {
    data: fetchedInput,
    refetch,
    isLoading,
    error,
  } = useGetInputQuery(id);

  useEffect(() => {
    if (fetchedInput) {
      setInput(fetchedInput);
    }
  }, [fetchedInput]);

  if (isLoading)
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </div>
    );

  if (error)
    return (
      <div className="alert alert-danger mt-4 text-center">
        ⚠️ {error.message}
      </div>
    );

  if (!input)
    return (
      <div className="alert alert-warning mt-4 text-center">
        No input found.
      </div>
    );

  return (
    <Container fluid className="py-4">
      {/* Header */}
      <div className="text-center mb-4">
        <h2 className="fw-bold text-primary mb-2">
          <GiFurnace className="me-2 text-danger" />
          Furnace Input Details
        </h2>
        <p className="text-muted">
          Overview of the melting process and cost breakdown.
        </p>
      </div>

      {/* General Details */}
      <Card className="shadow-lg border-0 mb-4 rounded-3">
        <Card.Header className="bg-dark text-white fw-bold">
          <FaInfoCircle className="me-2" />
          Input Overview
        </Card.Header>
        <Card.Body>
          <Row className="gy-3">
            <Col xs={12} md={4}>
              <h6 className="text-muted mb-1">
                <FaFire className="me-2 text-danger" />
                Heat Number
              </h6>
              <Badge bg="secondary" pill className="fs-6 px-3">
                {input.heatNo}
              </Badge>
            </Col>
            <Col xs={12} md={4}>
              <h6 className="text-muted mb-1">
                <FaCalendarAlt className="me-2 text-info" />
                Date
              </h6>
              <p className="mb-0 fw-semibold">
                {new Date(input.date).toLocaleDateString()}
              </p>
            </Col>
            <Col xs={12} md={4}>
              <h6 className="text-muted mb-1">
                <FaUserTie className="me-2 text-success" />
                Created By
              </h6>
              <p className="mb-0 fw-semibold">
                {input.createdBy?.name || "N/A"}
              </p>
            </Col>
            {input.details && (
              <Col xs={12}>
                <h6 className="text-muted mb-1">
                  <FaCogs className="me-2 text-warning" />
                  Details
                </h6>
                <p className="mb-0">{input.details}</p>
              </Col>
            )}
          </Row>
        </Card.Body>
      </Card>

      {/* Materials */}
      <Card className="shadow-lg border-0 mb-4">
        <Card.Header className="bg-primary text-white fw-bold">
          <FaTools className="me-2" />
          Materials Used
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table striped bordered hover responsive className="align-middle mb-0">
              <thead className="table-dark text-center">
                <tr>
                  <th>Product</th>
                  <th>Quantity (Kg)</th>
                  <th>Cost (₹)</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {input.materials.map((mat, index) => (
                  <tr key={index}>
                    <td>{mat.Product?.Product || "N/A"}</td>
                    <td>{mat.qtyInKg}</td>
                    <td>
                      ₹{mat.cost ? mat.cost.toFixed(2) : "0.00"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>

      {/* Summary Section */}
      <Row className="gy-4">
        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-success text-white fw-bold">
              <FaMoneyBillWave className="me-2" />
              Material Summary
            </Card.Header>
            <Card.Body>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total Material Cost</span>
                  <strong className="text-success">
                    ₹{input.totalMaterialCost?.toFixed(2)}
                  </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Total Material (Kg)</span>
                  <strong>{input.totalMaterialInKg}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Cost per Kg</span>
                  <strong className="text-primary">
                    ₹{input.materialkgPerCost?.toFixed(2)}
                  </strong>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-warning text-dark fw-bold">
              <FaCogs className="me-2" />
              Overall Summary
            </Card.Header>
            <Card.Body>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Overall Cost</span>
                  <strong className="text-danger">
                    ₹{input.overallCost?.toFixed(2)}
                  </strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Overall Cost per Kg</span>
                  <strong className="text-primary">
                    ₹{input.overallmaterialkgPerCost?.toFixed(2)}
                  </strong>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Other Costs */}
      <Card className="mt-5 border-0 shadow-lg">
        <Card.Header className="bg-danger text-white fw-bold">
          <FaGasPump className="me-2" />
          Additional Operational Costs
        </Card.Header>
        <Card.Body>
          <Row className="gy-3">
            <Col xs={12} md={6}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  👷 Workers’ Salary: ₹{input.workersSalary}
                </li>
                <li className="list-group-item">
                  👔 Middle Management Salary: ₹{input.middleManagementSalary}
                </li>
                <li className="list-group-item">
                  🧑‍💼 Top Management Salary: ₹{input.topManagementSalary}
                </li>
                <li className="list-group-item">
                  <MdOutlineFoodBank className="me-2 text-success" />
                  Food Cost: ₹{input.foodCost}
                </li>
                <li className="list-group-item">
                  ⛽ Forklift Fuel: ₹{input.fuelForkLiftCost}
                </li>
              </ul>
            </Col>
            <Col xs={12} md={6}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <FaGasPump className="me-2 text-danger" />
                  Gas Cost: ₹{input.gasCost}
                </li>
                <li className="list-group-item">
                  <MdOutlineWaterDrop className="me-2 text-primary" />
                  Water Cost: ₹{input.waterCost}
                </li>
                <li className="list-group-item">
                  <BsLightningChargeFill className="me-2 text-warning" />
                  Electricity Cost: ₹{input.electricityCost}
                </li>
                <li className="list-group-item">
                  🛠 Maintenance Cost: ₹{input.maintenanceCost}
                </li>
              </ul>
            </Col>
          </Row>
        </Card.Body>
      </Card>

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
        }
      `}</style>
    </Container>
  );
};

export default InputDetailsScreen;
