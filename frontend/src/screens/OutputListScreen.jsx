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
  Form,
} from "react-bootstrap";

const OutputListScreen = () => {
  const [outputs, setOutputs] = useState([]);
  const [filteredOutputs, setFilteredOutputs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: outputsList, isLoading, isError, error, refetch } = useGetOutputsQuery();
  const [deleteOutput] = useDeleteOutputMutation();

  useEffect(() => {
    if (outputsList) {
      setOutputs(outputsList.data);
      setFilteredOutputs(outputsList.data);
    }
  }, [outputsList]);

  useEffect(() => {
    let filtered = outputs;
    if (startDate) {
      filtered = filtered.filter(
        (o) => new Date(o?.input?.date || o.createdAt) >= new Date(startDate)
      );
    }
    if (endDate) {
      filtered = filtered.filter(
        (o) => new Date(o?.input?.date || o.createdAt) <= new Date(endDate)
      );
    }
    setFilteredOutputs(filtered);
  }, [startDate, endDate, outputs]);

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

  const renderCardView = () => (
    <Row className="g-3">
      {filteredOutputs.map((output) => (
        <Col xs={12} key={output._id}>
          <Card className="shadow-sm border-0 rounded-3">
            <Card.Header className="bg-primary text-white fw-bold d-flex justify-content-between align-items-center">
              <span>
                <FaFire className="me-2" />
                Heat No: {output?.input?.heatNo || "N/A"}
              </span>
              <Badge bg="light" text="dark">
                {new Date(output?.input?.date || output.createdAt).toLocaleDateString()}
              </Badge>
            </Card.Header>
            <Card.Body className="p-2">
              <Row>
                <Col xs={6} className="small">
                  <p className="mb-1"><strong>Details:</strong> {output.details || "—"}</p>
                  <p className="mb-1"><GiMetalBar className="me-1 text-success" />Output FG: {output.outputFG} Kg</p>
                  <p className="mb-1"><strong>Total Output:</strong> {output.totalOutput} Kg</p>
                </Col>
                <Col xs={6} className="small">
                  <p className="mb-1"><FaPercent className="me-1 text-warning" />Dross: {output.drossInPerc?.toFixed(2)}%</p>
                  <p className="mb-1"><FaPercent className="me-1 text-danger" />Iron: {output.ironInPerc?.toFixed(2)}%</p>
                  <p className="mb-1"><strong className="text-success">Recovery:</strong> {output.actualRecovery?.toFixed(2)}%</p>
                </Col>
              </Row>
              <hr className="my-2"/>
              <Row>
                <Col xs={6} className="small">
                  <p className="mb-1"><FaRupeeSign className="me-1 text-primary" />Cost/Kg: RM {output.actualCostPerKg?.toFixed(2)}</p>
                  <p className="mb-1"><FaRupeeSign className="me-1 text-info" />Cost w/ Conversion: RM {output.costWithConversionPerKg?.toFixed(2)}</p>
                </Col>
                <Col xs={6} className="small">
                  <p className="mb-1"><FaRupeeSign className="me-1 text-secondary" />Overall: RM {output.overallCostPerKg?.toFixed(2)}</p>
                </Col>
              </Row>
              <div className="d-flex justify-content-end gap-2 mt-2">
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

  const renderTableView = () => (
    <div className="table-responsive">
      <Table bordered hover responsive className="align-middle shadow-sm table-sm text-nowrap" style={{ fontSize: "0.85rem" }}>
        <thead className="table-dark text-center">
          <tr>
            <th>Heat No</th>
            <th>Date</th>
            <th className="d-none d-lg-table-cell">Details</th>
            <th>Output FG</th>
            <th>Total Output</th>
            <th className="d-none d-lg-table-cell">Dross</th>
            <th className="d-none d-lg-table-cell">Iron</th>
            <th>Dross %</th>
            <th>Iron %</th>
            <th>Recovery %</th>
            <th>Cost/Kg</th>
            <th className="d-none d-lg-table-cell">Overall Cost/Kg</th>
            <th className="d-none d-lg-table-cell">Cost w/ Conversion</th>
            <th className="d-none d-lg-table-cell">Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {filteredOutputs.length > 0 ? (
            filteredOutputs.map((output) => (
              <tr key={output._id} className="table-row-hover">
                <td className="fw-bold text-primary">{output?.input?.heatNo || "N/A"}</td>
                <td>{new Date(output?.input?.date || output.createdAt).toLocaleDateString()}</td>
                <td className="d-none d-lg-table-cell text-truncate" style={{ maxWidth: "120px" }}>{output?.details || "-"}</td>
                <td className="text-end">{output?.outputFG}</td>
                <td className="text-end">{output?.totalOutput}</td>
                <td className="d-none d-lg-table-cell text-end">{output?.dross}</td>
                <td className="d-none d-lg-table-cell text-end">{output?.iron}</td>
                <td className="text-end">{output?.drossInPerc?.toFixed(2)}%</td>
                <td className="text-end">{output?.ironInPerc?.toFixed(2)}%</td>
                <td className="text-end text-success fw-semibold">{output?.actualRecovery?.toFixed(2)}%</td>
                <td className="text-end">RM {output?.actualCostPerKg?.toFixed(2)}</td>
                <td className="d-none d-lg-table-cell text-end">RM {output?.overallCostPerKg?.toFixed(2)}</td>
                <td className="d-none d-lg-table-cell text-end">RM {output?.costWithConversionPerKg?.toFixed(2)}</td>
                <td className="d-none d-lg-table-cell">{new Date(output.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="d-flex justify-content-center gap-1">
                    <Button variant="outline-danger" size="sm" title="Delete" onClick={() => deleteHandler(output._id)}>
                      <FaTrashAlt />
                    </Button>
                    <LinkContainer to={`/output/${output._id}/detail`}>
                      <Button variant="outline-secondary" size="sm" title="View Details">
                        <FaInfoCircle />
                      </Button>
                    </LinkContainer>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="15" className="text-center">
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
          <p className="text-muted small">Review and manage all furnace output records.</p>
        </Col>
      </Row>

      {/* Date Range Filter */}
      <Row className="mb-4">
        <Col md={3} sm={6} xs={12}>
          <Form.Group controlId="startDate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={3} sm={6} xs={12}>
          <Form.Group controlId="endDate">
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </Form.Group>
        </Col>
        <Col md={6} className="d-flex align-items-end">
          <Button variant="secondary" className="ms-2" onClick={() => { setStartDate(""); setEndDate(""); }}>
            Clear Filter
          </Button>
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
          <div className="d-block d-md-none">{renderCardView()}</div>
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
