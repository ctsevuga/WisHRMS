// src/components/OutputCreate.js
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
} from "react-bootstrap";

const OutputScreen = () => {
  const { userInfo } = useSelector((state) => state.auth);
 
  const [outputFG, setOutputFG] = useState(0);
  const [totalOutput, setTotalOutput] = useState(0);
  const [dross, setDross] = useState(0);
  const [iron, setIron] = useState(0);
  const [inputId, setInputId] = useState("");
  const [createdBy, setCreatedBy] = useState(""); // Can be set via auth

  const { data: inputList = [], isLoading: loadingInputs } = useGetBasicInputsQuery();
  const [createOutput, { isLoading: submitting }] = useCreateOutputMutation();
useEffect(() => {
    if (userInfo?._id) {
      setCreatedBy(userInfo._id);
    }
  }, [userInfo]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      
      await createOutput({
        outputFG,
        totalOutput,
        dross,
        iron,
        input: inputId,
        createdBy: userInfo?._id,
      }).unwrap();

      toast.success("Output created successfully");
      setOutputFG(0);
      setTotalOutput(0);
      setDross(0);
      setIron(0);
      setInputId("");
      setCreatedBy("");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create output");
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-4">
        <Link to="/outputlist">
          <Button variant="outline-primary" size="lg">
            ← Go Back
          </Button>
        </Link>
      </div>

      <Container className="mt-5">
        <h2>Create Output Entry</h2>

        <Form onSubmit={handleSubmit}>
          {/* Input Select at the top */}
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="inputId">
                <Form.Label>Input (Heat No)</Form.Label>
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
            </Col>

            {/* <Col md={6}>
              <Form.Group controlId="createdBy">
                <Form.Label>Created By (User ID)</Form.Label>
                <Form.Control
                  type="text"
                  value={createdBy}
                  onChange={(e) => setCreatedBy(e.target.value)}
                  required
                />
              </Form.Group>
            </Col> */}
          </Row>

          <Row className="mb-3">
            <Col md={3}>
              <Form.Group controlId="outputFG">
                <Form.Label>Output FG (kg)</Form.Label>
                <Form.Control
                  type="number"
                  value={outputFG}
                  onChange={(e) => setOutputFG(Number(e.target.value))}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="totalOutput">
                <Form.Label>Total Output (kg)</Form.Label>
                <Form.Control
                  type="number"
                  value={totalOutput}
                  onChange={(e) => setTotalOutput(Number(e.target.value))}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="dross">
                <Form.Label>Dross (kg)</Form.Label>
                <Form.Control
                  type="number"
                  value={dross}
                  onChange={(e) => setDross(Number(e.target.value))}
                />
              </Form.Group>
            </Col>
            <Col md={3}>
              <Form.Group controlId="iron">
                <Form.Label>Iron (kg)</Form.Label>
                <Form.Control
                  type="number"
                  value={iron}
                  onChange={(e) => setIron(Number(e.target.value))}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner animation="border" size="sm" /> Creating...
              </>
            ) : (
              "Create Output"
            )}
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default OutputScreen;
