import React, { useEffect, useState } from "react";
import { FaInfoCircle, FaTrashAlt } from "react-icons/fa";
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
        toast.success("Output deleted successfully");
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h3 className="text-primary fw-bold text-center">🏭 Output List</h3>
        </Col>
      </Row>

      {isLoading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading outputs...</p>
        </div>
      ) : isError ? (
        <Alert variant="danger">
          {error?.data?.message || "❌ Failed to load outputs"}
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover responsive className="align-middle">
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
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {Array.isArray(outputs) && outputs.length > 0 ? (
                outputs.map((output) => (
                  <tr key={output._id}>
                    <td className="fw-bold">{output?.input?.heatNo || "N/A"}</td>
                    <td>{output?.details || "-"}</td>
                    <td>{output?.outputFG}</td>
                    <td>{output?.totalOutput}</td>
                    <td>{output?.dross}</td>
                    <td>{output?.iron}</td>
                    <td>{output?.drossInPerc?.toFixed(2)}%</td>
                    <td>{output?.ironInPerc?.toFixed(2)}%</td>
                    <td className="text-success">
                      {output?.actualRecovery?.toFixed(2)}%
                    </td>
                    <td>₹{output?.actualCostPerKg?.toFixed(2)}</td>
                    <td>₹{output?.overallCostPerKg?.toFixed(2)}</td>
                    <td>
                      {new Date(output.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <div className="d-flex justify-content-center gap-2">
                        <Button
                          variant="danger"
                          size="sm"
                          title="Delete"
                          onClick={() => deleteHandler(output._id)}
                          aria-label="Delete"
                        >
                          <FaTrashAlt />
                        </Button>
                        <LinkContainer to={`/output/${output._id}/detail`}>
                          <Button
                            variant="secondary"
                            size="sm"
                            title="View Details"
                            aria-label="View Details"
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
                  <td colSpan="13" className="text-center">
                    <Alert variant="info" className="mb-0">
                      No outputs found.
                    </Alert>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default OutputListScreen;
