import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaTrashAlt, FaFire, FaPercent, FaRupeeSign } from "react-icons/fa";
import { GiMetalBar } from "react-icons/gi";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import {
  useGetOutputsQuery,
  useDeleteOutputMutation,
} from "../slices/outputApiSlice";
import {
  Spinner,
  Table,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Badge,
  Card,
} from "react-bootstrap";

const OutputListScreen = () => {
  const [outputs, setOutputs] = useState([]);

  const {
    data: outputsList,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetOutputsQuery();

  const [deleteOutput] = useDeleteOutputMutation();

  useEffect(() => {
    if (outputsList) {
      setOutputs(outputsList.data);
    }
  }, [outputsList]);

  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this output?")) {
      try {
        await deleteOutput(id);
        toast.success("✅ Output deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // ✅ Card Layout for Small Screens
  const renderCardView = () => (
    <Row className="g-3">
      {outputs.map((output) => (
        <Col xs={12} key={output._id}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Header className="bg-primary text-white fw-bold d-flex justify-content-between align-items-center">
              <span>
                <FaFire className="me-2" />
                Heat No: {output?.input?.heatNo || "N/A"}
              </span>
              <Badge bg="light" text="dark">
                {new Date(output.createdAt).toLocaleDateString()}
              </Badge>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col xs={6}>
                  <p><strong>Details:</strong> {output.details || "—"}</p>
                  <p><GiMetalBar className="me-2 text-success" />Output FG: {output.outputFG} Kg</p>
                  <p><strong>Total Output:</strong> {output.totalOutput} Kg</p>
                </Col>
                <Col xs={6}>
                  <p><FaPercent className="me-2 text-warning" />Dross: {output.drossInPerc?.toFixed(2)}%</p>
                  <p><FaPercent className="me-2 text-danger" />Iron: {output.ironInPerc?.toFixed(2)}%</p>
                  <p><strong className="text-success">Recovery:</strong> {output.actualRecovery?.toFixed(2)}%</p>
                </Col>
              </Row>
              <hr />
              <Row>
                <Col xs={6}>
                  <p><FaRupeeSign className="me-2 text-primary" />Cost/Kg: ₹{output.actualCostPerKg?.toFixed(2)}</p>
                  <p><FaRupeeSign className="me-2 text-info" />Cost w/ Conversion: ₹{output.costWithConversionPerKg?.toFixed(2)}</p>
                </Col>
                <Col xs={6}>
                  <p><FaRupeeSign className="me-2 text-secondary" />Overall: ₹{output.overallCostPerKg?.toFixed(2)}</p>
                </Col>
              </Row>
              <div className="d-flex justify-content-end gap-2 mt-3">
                <LinkContainer to={`/output/${output._id}/detail`}>
                  <Button variant="outline-secondary" size="sm">
                    <FaInfoCircle className="me-1" /> Details
                  </Button>
                </LinkContainer>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => deleteHandler(output._id)}
                >
                  <FaTrashAlt className="me-1" /> Delete
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );

  // ✅ Table Layout for Desktop
  const renderTableView = () => (
    <div className="table-responsive">
      <Table bordered hover responsive className="align-middle shadow-sm">
        <thead className="table-dark text-center">
          <tr>
            <th>Heat No</th>
            <th>Details</th>
            <th>Output FG</th>
            <th>Total Output</th>
            <th>Dross</th>
            <th>Iron</th>
            <th>Dross %</th>
            <th>Iron %</th>
            <th>Recovery %</th>
            <th>Cost/Kg</th>
            <th>Overall Cost/Kg</th>
            <th>Cost w/ Conversion</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {Array.isArray(outputs) && outputs.length > 0 ? (
            outputs.map((output) => (
              <tr key={output._id} className="table-row-hover">
                <td className="fw-bold text-primary">
                  {output?.input?.heatNo || "N/A"}
                </td>
                <td>{output?.details || "-"}</td>
                <td className="text-success fw-semibold">{output?.outputFG}</td>
                <td>{output?.totalOutput}</td>
                <td>{output?.dross}</td>
                <td>{output?.iron}</td>
                <td>{output?.drossInPerc?.toFixed(2)}%</td>
                <td>{output?.ironInPerc?.toFixed(2)}%</td>
                <td className="text-success fw-semibold">
                  {output?.actualRecovery?.toFixed(2)}%
                </td>
                <td>₹{output?.actualCostPerKg?.toFixed(2)}</td>
                <td>₹{output?.overallCostPerKg?.toFixed(2)}</td>
                <td>₹{output?.costWithConversionPerKg?.toFixed(2)}</td>
                <td>{new Date(output.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button
                      variant="outline-danger"
                      size="sm"
                      title="Delete"
                      onClick={() => deleteHandler(output._id)}
                    >
                      <FaTrashAlt />
                    </Button>
                    <LinkContainer to={`/output/${output._id}/detail`}>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        title="View Details"
                      >
                        <FaInfoCircle />
                      </Button>
                    </LinkContainer>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="14" className="text-center">
                <Alert variant="info" className="mb-0">
                  No outputs found.
                </Alert>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );

  return (
    <Container className="py-4">
      <Row className="mb-4 text-center">
        <Col>
          <h3 className="fw-bold text-primary">
            🏭 <span className="text-dark">Output</span> List
          </h3>
          <p className="text-muted small">
            Review and manage all furnace output records.
          </p>
        </Col>
      </Row>

      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Loading outputs...</p>
        </div>
      ) : isError ? (
        <Alert variant="danger" className="text-center">
          ❌ {error?.data?.message || "Failed to load outputs."}
        </Alert>
      ) : (
        <>
          {/* Mobile view → cards */}
          <div className="d-block d-md-none">{renderCardView()}</div>

          {/* Desktop view → table */}
          <div className="d-none d-md-block">{renderTableView()}</div>
        </>
      )}

      <style jsx>{`
        .table-row-hover:hover {
          background-color: #f5f7ff;
          transition: background-color 0.2s ease-in-out;
        }
        .card {
          border-left: 5px solid #0d6efd;
          transition: transform 0.2s ease-in-out;
        }
        .card:hover {
          transform: scale(1.01);
        }
      `}</style>
    </Container>
  );
};

export default OutputListScreen;
