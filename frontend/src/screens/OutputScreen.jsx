import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useCreateOutputMutation } from "../slices/outputApiSlice";
import { useGetBasicInputsQuery } from "../slices/inputApiSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Spinner,
  Card,
} from "react-bootstrap";
import { FaFire, FaWeightHanging, FaRecycle, FaHammer, FaInfoCircle } from "react-icons/fa";

const OutputScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [details, setDetails] = useState(""); // ✅ new state
  const [outputFG, setOutputFG] = useState(0);
  const [totalOutput, setTotalOutput] = useState(0);
  const [dross, setDross] = useState(0);
  const [iron, setIron] = useState(0);
  const [inputId, setInputId] = useState("");

  const { data: inputList = [], isLoading: loadingInputs } = useGetBasicInputsQuery();
  const [createOutput, { isLoading: submitting }] = useCreateOutputMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputId) {
      toast.error("Please select a Heat No.");
      return;
    }

    try {
      await createOutput({
        details, // ✅ include optional field
        outputFG,
        totalOutput,
        dross,
        iron,
        input: inputId,
        createdBy: userInfo?._id,
      }).unwrap();

      toast.success("Output created successfully");

      // Reset form
      setDetails(""); // ✅ reset details
      setOutputFG(0);
      setTotalOutput(0);
      setDross(0);
      setIron(0);
      setInputId("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create output");
    }
  };

  return (
    <Container className="my-5">
      {/* Back Button */}
      <div className="mb-4">
        <Link to="/outputlist">
          <Button variant="outline-primary" size="lg">
            ← Go Back
          </Button>
        </Link>
      </div>

      <Card className="shadow-sm p-3 p-md-5 rounded-4 border-0">
        <h2 className="text-center text-primary mb-4">🏭 Create Output Entry</h2>
        <p className="text-muted text-center mb-4">
          Fill in the output details for the selected heat number.
        </p>

        {loadingInputs ? (
          <div className="text-center my-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3 text-muted">Loading input heat numbers...</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            {/* Heat No Select */}
            <Form.Group controlId="inputId" className="mb-4">
              <Form.Label>
                <FaFire className="me-2 text-danger" />
                Input Heat No
              </Form.Label>
              <Form.Select
                value={inputId}
                onChange={(e) => setInputId(e.target.value)}
                required
              >
                <option value="">-- Select Heat No --</option>
                {inputList.map((input) => (
                  <option key={input._id} value={input._id}>
                    {input.heatNo}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            {/* Outputs Grid */}
            <Row className="g-3 mb-4">
              <Col xs={12} md={6}>
                <Form.Group controlId="outputFG">
                  <Form.Label>
                    <FaWeightHanging className="me-2 text-success" />
                    Output FG (kg)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={outputFG}
                    min="0"
                    onChange={(e) => setOutputFG(Number(e.target.value))}
                    required
                    className="border-success"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="totalOutput">
                  <Form.Label>
                    <FaRecycle className="me-2 text-warning" />
                    Total Output (kg)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={totalOutput}
                    min="0"
                    onChange={(e) => setTotalOutput(Number(e.target.value))}
                    required
                    className="border-warning"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="dross">
                  <Form.Label>
                    <FaHammer className="me-2 text-danger" />
                    Dross (kg)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={dross}
                    min="0"
                    onChange={(e) => setDross(Number(e.target.value))}
                    className="border-danger"
                  />
                </Form.Group>
              </Col>

              <Col xs={12} md={6}>
                <Form.Group controlId="iron">
                  <Form.Label>
                    <FaHammer className="me-2 text-secondary" />
                    Iron (kg)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    value={iron}
                    min="0"
                    onChange={(e) => setIron(Number(e.target.value))}
                    className="border-secondary"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* ✅ Details Field */}
            <Form.Group controlId="details" className="mb-4">
              <Form.Label>
                <FaInfoCircle className="me-2 text-info" />
                Additional Details (optional)
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter any additional information about this output..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" size="lg" type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" /> Creating...
                  </>
                ) : (
                  "Create Output"
                )}
              </Button>
            </div>
          </Form>
        )}
      </Card>

      <style jsx>{`
        h2 {
          font-weight: 700;
        }
        .form-control:focus {
          box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
        }
      `}</style>
    </Container>
  );
};

export default OutputScreen;
