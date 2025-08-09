import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useGetEmployeesQuery } from "../../slices/employeesApiSlice";
import { useCreateSalaryMutation } from "../../slices/salaryApiSlice";
const SalaryScreen = () => {
  const { data: employees, refetch, isLoading, error } = useGetEmployeesQuery();
  const [empId, setEmpId] = useState();
  const [name, setName] = useState("");
  const [basic, setBasic] = useState();
  const [hra, setHra] = useState();
  const [conveyance, setConveyance] = useState();
  const [otherAllowances, setOtherAllowances] = useState();
  const [pf, setPf] = useState();
  const [esi, setEsi] = useState();
  const [tax, setTax] = useState();
  const [effectiveFrom, setEffectiveFrom] = useState();
  const [effectiveTo, setEffectiveTo] = useState();
  // const [formData, setFormData] = useState({
  //   empId: "",
  //   name: "",
  //   basic: "",
  //   hra: "",
  //   conveyance: "",
  //   otherAllowances: "",
  //   pf: "",
  //   esi: "",
  //   tax: "",
  //   effectiveFrom: "",
  //   effectiveTo: "",
  // });
  const [message, setMessage] = useState("");
  const [createSalary] = useCreateSalaryMutation();

  // const handleChange = (e) => {
  //   const name = e.target.value;
  //   setSelectedName(name);

  //   // Find employee by name
  //   const selectedEmployee = employees.find((emp) => emp.name === name);
  //   setSelectedEmpId(selectedEmployee?.empId || "");
  // };

  const handleChange = (e) => {
    const name = e.target.value;
    setName(name);

    // Find employee by name
    const selectedEmployee = employees.find((emp) => emp.name === name);
    setEmpId(selectedEmployee?.empId || "");
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      console.log(name);
      console.log(empId);
      const res = await createSalary({
        empId,
        name,
        basic,
        hra,
        conveyance,
        otherAllowances,
        pf,
        esi,
        tax,
        effectiveFrom,
        effectiveTo,
      }).unwrap();
      
      
      setEmpId("");
      setName("");
      setBasic();
      setHra();
      setConveyance();
      setOtherAllowances();
      setPf();
      setEsi();
      setTax();
      setEffectiveFrom("");
      setEffectiveTo("");
      toast.success("Salary record created successfully!");
    } catch (err) {
      console.error("Error creating salary:", err);
      setMessage("Failed to create salary.");
    }
  };

  return (
    <>
      <Row>
        <Col md={3}>
          <h2>Salary Creation</h2>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Select Employee</Form.Label>
              <Form.Control as="select" value={name} onChange={handleChange}>
                <option value="">-- Select --</option>
                {employees?.map((emp, index) => (
                  <option value={emp.name} key={index}>
                    {emp.name}
                  </option>
                ))}
              </Form.Control>
              {empId && (
                <Form.Label className="mt-2">
                  Employee ID: <strong>{empId}</strong>
                </Form.Label>
              )}
            </Form.Group>
            <Form.Group controlId="basic">
              <Form.Label>Basic</Form.Label>
              <Form.Control
                type="number"
                value={basic}
                onChange={(e) => setBasic(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="hra">
              <Form.Label>HRA</Form.Label>
              <Form.Control
                type="number"
                value={hra}
                onChange={(e) => setHra(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="conveyance">
              <Form.Label>Conveyance</Form.Label>
              <Form.Control
                type="number"
                value={conveyance}
                onChange={(e) => setConveyance(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="otherAllowances">
              <Form.Label>Other Allowances</Form.Label>
              <Form.Control
                type="number"
                value={otherAllowances}
                onChange={(e) => setOtherAllowances(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="pf">
              <Form.Label>PF</Form.Label>
              <Form.Control
                type="number"
                value={pf}
                onChange={(e) => setPf(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="esi">
              <Form.Label>ESI</Form.Label>
              <Form.Control
                type="number"
                value={esi}
                onChange={(e) => setEsi(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="tax">
              <Form.Label>TAX</Form.Label>
              <Form.Control
                type="number"
                value={tax}
                onChange={(e) => setTax(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="effectiveFrom">
              <Form.Label>Effective From</Form.Label>
              <Form.Control
                type="date"
                value={effectiveFrom}
                onChange={(e) => setEffectiveFrom(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="effectiveTo">
              <Form.Label>Effective To</Form.Label>
              <Form.Control
                type="date"
                value={effectiveTo}
                onChange={(e) => setEffectiveTo(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default SalaryScreen;
