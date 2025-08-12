import React, { useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { useGetEmployeesQuery } from "../../slices/employeesApiSlice";
import { useCreateSalaryMutation } from "../../slices/salaryApiSlice";

const SalaryScreen = () => {
  const { data: employees } = useGetEmployeesQuery();

  const [empId, setEmpId] = useState("");
  const [name, setName] = useState("");
  const [basic, setBasic] = useState("");
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [effectiveTo, setEffectiveTo] = useState("");
  const [message, setMessage] = useState("");

  const [createSalary] = useCreateSalaryMutation();

  const handleChange = (e) => {
    const selectedName = e.target.value;
    setName(selectedName);

    const selectedEmployee = employees?.find((emp) => emp.name === selectedName);
    setEmpId(selectedEmployee?.empId || "");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createSalary({
        empId,
        name,
        basic,
        effectiveFrom,
        effectiveTo,
      }).unwrap();

      setEmpId("");
      setName("");
      setBasic("");
      setEffectiveFrom("");
      setEffectiveTo("");

      toast.success("Salary record created successfully!");
    } catch (err) {
      console.error("Error creating salary:", err);
      setMessage("Failed to create salary.");
    }
  };

  return (
    <Card className="p-4 shadow-sm">
      <h2 className="mb-4 text-center">Salary Creation</h2>

      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="name" className="mb-3">
              <Form.Label>Select Employee</Form.Label>
              <Form.Control as="select" value={name} onChange={handleChange}>
                <option value="">-- Select --</option>
                {employees?.map((emp, index) => (
                  <option value={emp.name} key={index}>
                    {emp.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="basic" className="mb-3">
              <Form.Label>Basic Salary</Form.Label>
              <Form.Control
                type="number"
                value={basic}
                onChange={(e) => setBasic(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="effectiveFrom" className="mb-3">
              <Form.Label>Effective From</Form.Label>
              <Form.Control
                type="date"
                value={effectiveFrom}
                onChange={(e) => setEffectiveFrom(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="empId" className="mb-3">
              <Form.Label>Employee ID</Form.Label>
              <Form.Control
                type="text"
                value={empId}
                readOnly
                plaintext
                className="bg-light"
              />
            </Form.Group>

            <Form.Group controlId="effectiveTo" className="mb-3">
              <Form.Label>Effective To</Form.Label>
              <Form.Control
                type="date"
                value={effectiveTo}
                onChange={(e) => setEffectiveTo(e.target.value)}
              />
            </Form.Group>

            <div className="d-grid mt-4">
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </Col>
        </Row>

        {message && <p className="text-danger mt-3">{message}</p>}
      </Form>
    </Card>
  );
};

export default SalaryScreen;
